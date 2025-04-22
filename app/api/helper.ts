import { ethers } from "ethers";
import { TransactionResponse } from "./types";

export const provider = new ethers.JsonRpcProvider(
   "https://soneium-minato.rpc.scs.startale.com?apikey=" +
      process.env.SCS_API_KEY
);

export async function openrouterRequest(messages: any, prompt: string) {
   const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
         method: "POST",
         headers: {
            Authorization:
               "Bearer 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",
            // "HTTP-Referer": "<YOUR_SITE_URL>",
            // "X-Title": "<YOUR_SITE_NAME>",
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            model: "meta-llama/llama-4-maverick:free",
            messages: [
               {
                  role: "system",
                  content: prompt,
               },
               {
                  role: "user",
                  content: messages,
               },
            ],
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

export async function checkBalance(address: string) {
   const balance = await provider.getBalance(address);
   return ethers.formatEther(balance);
}

export async function checkTokenBalance(address: string, token: string) {
   const abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
   ];
   const contract = new ethers.Contract(token, abi, provider);
   const balance = await contract.balanceOf(address);
   return (
      ethers.formatUnits(balance, await contract.decimals()) +
      " " +
      (await contract.symbol())
   );
}

export async function checkTransaction(hash: string) {
   const tx = await provider.getTransaction(hash);
   return tx;
}

export async function checkTransactions(address: string) {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BLOCKSCOUT_API_URL}/api/v2/addresses/${address}/transactions?filter=to|from   `
   );
   const data: TransactionResponse = await response.json();
   const result = data.items.map((tx) => {
      return {
         hash: tx.hash,
         timestamp: tx.timestamp,
         amount: tx.value,
         type: tx.method,
         status: tx.status,
         direction: tx.from.hash === address ? "out" : "in",
      };
   });
   return result;
}
