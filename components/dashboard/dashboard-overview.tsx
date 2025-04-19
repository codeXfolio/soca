"use client";
import { Tokens, useAppKitAccount } from "@reown/appkit/react";
import { NetworkStatusBar } from "./network-status-bar";
import OverviewCard from "./overview-card";
import { PortfolioCard } from "./portfolio-card";
import { RecentActivityCard } from "./recent-activity-card";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

interface Transaction {
   type: "Send" | "Receive" | "Swap" | "Deploy" | "Call Contract";
   direction: "in" | "out" | "neutral";
   time: string;
   amount: string;
   status: string;
   hash: string;
}

interface Token {
   symbol: string;
   name: string;
   amount: number;
   value: number;
}

export function DashboardOverview() {
   const { address } = useAppKitAccount();

   const [activity, setActivity] = useState<Transaction[] | null>(null);
   const [portfolio, setPortfolio] = useState<Token[] | null>(null);

   async function fetchEthPrice() {
      const response = await fetch(
         "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      if (!response.ok) {
         throw new Error("Failed to fetch ETH price");
      }
      const data = await response.json();
      return data.ethereum.usd;
   }

   function getDirection(from: string, to: string): "in" | "out" | "neutral" {
      if (
         from.toLowerCase() === address?.toLocaleLowerCase() &&
         to.toLowerCase() !== address?.toLocaleLowerCase()
      ) {
         return "out";
      }
      if (
         from.toLowerCase() !== address?.toLocaleLowerCase() &&
         to.toLowerCase() === address?.toLocaleLowerCase()
      ) {
         return "in";
      }
      return "neutral";
   }

   function getType(
      method: string,
      isContract: boolean,
      direction: "in" | "out" | "neutral"
   ) {
      if (
         (method === "transfer" && isContract) ||
         (method === null && !isContract && direction === "out")
      ) {
         return "Send";
      }

      if (
         (method === "transfer" && !isContract) ||
         (method === null && !isContract && direction === "in")
      ) {
         return "Receive";
      }
   }

   useEffect(() => {
      async function fetchActivity() {
         if (!address) return;

         const response = await fetch(
            `https://soneium-minato.blockscout.com/api/v2/addresses/${address}/transactions?filter=to|from`
         );
         const data = await response.json();
         const transactions: Transaction[] = data.items.map((tx: any) => ({
            type: getType(
               tx.method,
               tx.to.is_contract || tx.from.is_contract,
               getDirection(tx.from.hash, tx.to.hash)
            ),
            direction: getDirection(tx.from.hash, tx.to.hash),
            time: new Date(tx.timestamp).toLocaleString(),
            amount: ethers.formatEther(tx.value),
            status: tx.status == "ok" ? "Completed" : "Failed",
            hash: tx.hash,
         }));
         setActivity(transactions);
      }

      async function fetchPortfolio() {
         if (!address) return;
         const res = await fetch(
            `https://soneium-minato.blockscout.com/api/v2/addresses/${address}`
         );
         const response = await fetch(
            `https://soneium-minato.blockscout.com/api/v2/addresses/${address}/tokens?type=ERC-20`
         );
         const ethPrice = await fetchEthPrice();
         const data = await response.json();
         const data2 = await res.json();
         const tokens: Token[] = data.items.map((val: any) => ({
            symbol: val.token.symbol,
            name: val.token.name,
            amount: ethers.formatUnits(val.value, parseInt(val.token.decimals)),
            value:
               val.token.symbol == "USDC.e"
                  ? parseFloat(
                       ethers.formatUnits(
                          val.value,
                          parseInt(val.token.decimals)
                       )
                    )
                  : 0,
         }));
         tokens.unshift({
            symbol: "ETH",
            name: "Ethereum",
            amount: parseFloat(ethers.formatEther(data2.coin_balance)),
            value:
               parseFloat(ethers.formatEther(data2.coin_balance)) * ethPrice,
         });
         setPortfolio(tokens);
      }

      fetchPortfolio();
      fetchActivity();
   }, [address]);

   return (
      <div className="space-y-6">
         <NetworkStatusBar />

         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <OverviewCard />
         </div>

         <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <PortfolioCard tokens={portfolio || []} />
            <RecentActivityCard transactions={activity || []} />
         </div>
      </div>
   );
}
