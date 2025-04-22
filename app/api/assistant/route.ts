import { NextResponse } from "next/server";
import { prompt } from "./prompt";
import {
   checkBalance,
   checkTokenBalance,
   checkTransaction,
   checkTransactions,
   openrouterRequest,
   provider,
} from "../helper";
import { ethers } from "ethers";

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
         response: `Your balance is **${balance} ETH**`,
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
      `**Transaction Hash:** ${tx.hash}`,
      `**Block:** ${tx.blockNumber}`,
      `**From:** ${tx.from}`,
      `**To:** ${tx.to}`,
      `**Value:** ${tx.value}`,
      `**Timestamp:** ${new Date(block.timestamp * 1000).toLocaleString()}`,
   ].join("\n");

   return {
      action: "check_tx",
      response: `Here is the transaction details:\n${details}`,
   };
}

async function handleCheckTxs(address: string) {
   const txs = await checkTransactions(address);

   return {
      action: "check_txs",
      data: { txs },
      response: "Here are the transaction history",
   };
}

async function handleCheckToken(address: string) {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BLOCKSCOUT_API_URL}/api/v2/tokens/${address}`
   );
   const data: TokenScannerResult = await response.json();
   return {
      action: "check_token",
      data: {
         name: data.name,
         symbol: data.symbol,
         total_supply: data.total_supply,
         holders: data.holders,
         circulating_market_cap: data.circulating_market_cap,
      },
      response: "Here is the token details",
   };
}

export async function POST(request: Request) {
   try {
      const { messages } = await request.json();

      if (!messages?.length) {
         return NextResponse.json(
            { error: "No messages provided" },
            { status: 400 }
         );
      }

      const result = await openrouterRequest(messages, prompt);
      console.log(result);
      const response: ResultResponse = JSON.parse(
         result.replace(/```json|```/g, "")
      );

      switch (response.action) {
         case "info":
            return NextResponse.json(JSON.parse(result));

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
