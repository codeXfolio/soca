"use client";

import React, { useEffect, useState } from "react";
import { OverviewApiResponse } from "@/app/types";
import { useAppKitAccount } from "@reown/appkit/react";
import { Coins, LinkIcon, Wallet, BarChart3 } from "lucide-react";
import { StatCard } from "./stat-card";

const OverviewCard: React.FC = () => {
   const { address } = useAppKitAccount();
   const [data, setData] = useState<OverviewApiResponse | null>(null);

   useEffect(() => {
      if (!address) return;

      const fetchOverviewData = async () => {
         try {
            const response = await fetch(`/api/overview?address=${address}`);
            if (!response.ok) throw new Error("Failed to fetch overview data");
            const overviewData: OverviewApiResponse = await response.json();
            setData(overviewData);
         } catch (error) {
            console.error(error);
         }
      };

      fetchOverviewData();
   }, [address]);

   const defaultStats = [
      {
         title: "Total Portfolio Value",
         value: "$0",
         icon: <Coins className="h-4 w-4" />,
         change: null,
      },
      {
         title: "Staked Assets",
         value: "$0",
         icon: <LinkIcon className="h-4 w-4" />,
         change: null,
      },
      {
         title: "Balance",
         value: "- ETH",
         icon: <Wallet className="h-4 w-4" />,
         change: null,
      },
      {
         title: "Transaction Count",
         value: "-",
         icon: <BarChart3 className="h-4 w-4" />,
         change: null,
      },
   ];

   const stats = data
      ? defaultStats.map((stat) => {
           switch (stat.title) {
              case "Total Portfolio Value":
                 return { ...stat, value: `$${data.totalPortfolioValue}` };
              case "Staked Assets":
                 return { ...stat, value: `$${data.totalStakedValue}` };
              case "Balance":
                 return { ...stat, value: `${data.balance} ETH` };
              case "Transaction Count":
                 return { ...stat, value: `${data.nonce}` };
              default:
                 return stat;
           }
        })
      : defaultStats;

   return (
      <>
         {stats.map((stat, index) => (
            <StatCard
               key={index}
               title={stat.title}
               value={stat.value}
               icon={stat.icon}
               change={stat.change}
            />
         ))}
      </>
   );
};

export default OverviewCard;
