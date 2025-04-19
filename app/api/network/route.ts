import { ethers } from "ethers";
import { NextResponse } from "next/server";
import { provider } from "../helper";

export async function GET() {
   try {
      const [blockNumber, feeData] = await Promise.all([
         provider.getBlockNumber(),
         provider.getFeeData(),
      ]);
      const gasFee = ethers.formatUnits(feeData.gasPrice || 0, "gwei");

      return NextResponse.json({
         result: "success",
         block: blockNumber,
         gasPrice: parseFloat(gasFee).toFixed(4),
      });
   } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({
         result: "error",
         message: "Failed to fetch data",
      });
   }
}
