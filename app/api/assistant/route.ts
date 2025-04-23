import { NextResponse } from "next/server";
import { prompt as systemPrompt } from "./prompt";
import {
   checkBalance,
   checkTokenBalance,
   checkTransaction,
   checkTransactions,
   provider,
} from "../helper";
import { ethers } from "ethers";
import { Chat, PrismaClient } from "@/lib/generated/prisma";

interface ResultResponse {
   action: string;
   parameters: {
      address?: string;
      from_token?: string;
      to_token?: string;
      amount?: string;
      hash?: string;
      token?: string;
   };
   response: string;
}

interface TokenScannerResult {
   address: string;
   name: string;
   symbol: string;
   decimals: string;
   total_supply: string;
   holders: string;
   circulating_market_cap: string;
}

async function handleCheckBalance(response: ResultResponse) {
   const { address, token } = response.parameters;

   if (!address) {
      return {
         action: "info",
         parameters: {},
         response: "Please provide an address",
      };
   }

   if (!token || token === "ETH") {
      const balance = await checkBalance(address);
      return {
         action: "check_balance",
         response: `Your balance is **${parseFloat(balance).toFixed(5)} ETH**`,
      };
   }

   if (ethers.isAddress(token)) {
      const balance = await checkTokenBalance(address, token);
      return {
         action: "check_balance",
         response: `Your balance is **${balance}**`,
      };
   }

   throw new Error("Invalid token address");
}

async function handleCheckTransaction(hash: string) {
   const tx = await checkTransaction(hash);
   if (!tx) {
      return { response: "Transaction not found" };
   }

   if (!tx.blockNumber) {
      return { response: "Transaction is pending" };
   }

   const block = await provider.getBlock(tx.blockNumber);
   if (!block) {
      return { response: "Block not found" };
   }

   const details = [
      `**Block:** ${tx.blockNumber}`,
      `**From:** ${tx.from}`,
      `**To:** ${tx.to}`,
      `**Value:** ${parseFloat(
         ethers.formatEther(tx.value)
      ).toLocaleString()} ETH`,
      `**Timestamp:** ${new Date(block.timestamp * 1000).toLocaleString()}`,
   ].join("\n\n");

   return {
      action: "check_tx",
      response: `Here is the transaction details:\n\n${details}`,
   };
}

async function handleCheckTxs(address: string) {
   const txs = await checkTransactions(address);

   return {
      action: "check_txs",
      data: txs,
      response: "Here are the transaction history",
   };
}

async function handleCheckToken(address: string) {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BLOCKSCOUT_API_URL}/api/v2/tokens/${address}`
   );
   const data: TokenScannerResult = await response.json();
   const tokenDetails = [
      `**Name:** ${data.name}`,
      `**Symbol:** ${data.symbol}`,
      `**Total Supply:** ${parseFloat(
         ethers.formatUnits(data.total_supply, parseInt(data.decimals))
      ).toLocaleString()}`,
      `**Holders:** ${data.holders}`,
      `**Market Cap:** ${
         data.circulating_market_cap
            ? parseFloat(
                 ethers.formatUnits(
                    data.circulating_market_cap,
                    parseInt(data.decimals)
                 )
              ).toLocaleString()
            : "N/A"
      }`,
   ];
   return {
      action: "check_token",
      response: `Here is the token details:\n\n\n${tokenDetails.join("\n\n")}`,
   };
}

export async function POST(request: Request) {
   try {
      const { messages, model, signature } = await request.json();

      if (!messages?.length) {
         return NextResponse.json(
            { error: "No messages provided" },
            { status: 400 }
         );
      }

      if (messages.length > 1000) {
         return NextResponse.json(
            { error: "Messages limit exceeded" },
            { status: 400 }
         );
      }

      if (!model) {
         return NextResponse.json(
            { error: "No model provided" },
            { status: 400 }
         );
      }

      const verified = ethers.verifyMessage("Welcome to SOCA", signature);

      if (!verified) {
         return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
         );
      }

      const prisma = new PrismaClient();
      const chats = await prisma.chat.findMany({
         where: {
            address: verified.toUpperCase(),
         },
         orderBy: {
            createdAt: "desc",
         },
         take: 8,
      });
      const prompt: { role: string; content: string }[] = chats.map(
         (chat: Chat) => ({
            role: chat.role,
            content: chat.message,
         })
      );
      prompt.reverse();
      prompt.push({
         role: "user",
         content: messages,
      });
      prompt.unshift({
         role: "system",
         content: systemPrompt,
      });

      const result = await openrouterRequest(prompt, model);

      const response: ResultResponse = JSON.parse(
         result.replace(/```json|```/g, "")
      );

      if (chats.length >= 8) {
         await prisma.chat.deleteMany({
            where: {
               AND: [
                  {
                     address: verified.toUpperCase(),
                  },
                  {
                     id: { in: chats.slice(6, 8).map((chat) => chat.id) },
                  },
               ],
            },
         });
      }

      await prisma.chat.create({
         data: {
            address: verified.toUpperCase(),
            message: messages,
            role: "user",
         },
      });

      await prisma.chat.create({
         data: {
            address: verified.toUpperCase(),
            message: JSON.stringify(response),
            role: "system",
         },
      });

      switch (response.action) {
         case "info":
            const newResult = {
               action: "info",
               response: response.response.replace(/(?<=.)\n(?=.)/g, "\n\n"),
            };
            return NextResponse.json(newResult);

         case "transfer":
         case "swap":
            return NextResponse.json(response);

         case "check_balance":
            return NextResponse.json(await handleCheckBalance(response));

         case "check_tx":
            if (!response.parameters.hash) {
               return NextResponse.json(
                  { error: "Transaction hash required" },
                  { status: 400 }
               );
            }
            return NextResponse.json(
               await handleCheckTransaction(response.parameters.hash)
            );

         case "check_txs":
            if (!response.parameters.address) {
               return NextResponse.json(
                  { error: "Address required" },
                  { status: 400 }
               );
            }
            return NextResponse.json(
               await handleCheckTxs(response.parameters.address)
            );

         case "check_token":
            if (!response.parameters.address) {
               return NextResponse.json(
                  { error: "Token address required" },
                  { status: 400 }
               );
            }
            return NextResponse.json(
               await handleCheckToken(response.parameters.address)
            );
         default:
            return NextResponse.json({ message: "Request sent successfully" });
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}

async function openrouterRequest(
   messages: { role: string; content: string }[],
   model: string
) {
   const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
         method: "POST",
         headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            model,
            messages,
         }),
      }
   );

   const json = await response.json();
   if (!response.ok) {
      throw new Error(json.error || "Failed to fetch data");
   }

   const content = json.choices[0].message.content;
   return content;
}
