import { NextRequest, NextResponse } from "next/server";
import { provider } from "../helper";
import { OverviewApiResponse } from "@/app/types";
import { ethers } from "ethers";

export async function GET(req: NextRequest) {
   const address = req.nextUrl.searchParams.get("address");

   if (!address) {
      return NextResponse.json(
         {
            result: "error",
            message: "Address is required",
         },
         { status: 400 }
      );
   }

   const [ethPrice, balance, nonce] = await Promise.all([
      fetchEthPrice(),
      provider.getBalance(address),
      provider.getTransactionCount(address),
   ]);
   const formattedBalance = ethers.formatEther(balance);
   const totalPortfolioValue = parseFloat(formattedBalance) * ethPrice;
   const totalStakedValue = 0; // Placeholder for staked value

   return NextResponse.json<OverviewApiResponse>({
      result: "success",
      balance: parseFloat(formattedBalance).toFixed(5),
      nonce,
      totalPortfolioValue: totalPortfolioValue.toFixed(0).toString(),
      totalStakedValue: totalStakedValue.toString(),
   });
}

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
