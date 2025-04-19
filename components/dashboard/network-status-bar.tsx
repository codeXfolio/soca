"use client";
import { NetworkApiResponse } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Fuel, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function NetworkStatusBar() {
   const [data, setData] = useState({
      networkStatus: "Healthy",
      gasFee: "--",
      block: "--",
   });

   useEffect(() => {
      async function fetchData() {
         const response = await fetch("/api/network");
         if (!response.ok) {
            console.error("Failed to fetch network data");
            return;
         }
         const result: NetworkApiResponse = await response.json();
         if (result.result === "success") {
            setData({
               networkStatus: "Healthy",
               gasFee: result.gasPrice,
               block: result.block.toString(),
            });
         } else {
            console.error("Error fetching network data:", result.message);
            setData((prev) => ({
               ...prev,
               networkStatus: "Unhealthy",
            }));
         }
      }
      fetchData();
   }, []);

   return (
      <Card className="bg-card network-status-bar">
         <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
            <div className="flex items-center space-x-2">
               <Activity className="h-4 w-4 text-green-500" />
               <span className="font-medium">Network:</span>
               <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
               >
                  Healthy
               </Badge>
            </div>

            <div className="flex items-center space-x-2">
               <Fuel className="h-4 w-4 text-yellow-500" />
               <span className="font-medium">Gas Fee:</span>
               <span>{data.gasFee} Gwei</span>
            </div>

            <div className="flex items-center space-x-2">
               <Clock className="h-4 w-4 text-blue-500" />
               <span className="font-medium">Block:</span>
               <span>{data.block}</span>
            </div>
         </CardContent>
      </Card>
   );
}
