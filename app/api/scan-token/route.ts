import { NextRequest, NextResponse } from "next/server";
import { openrouterRequest } from "../helper";
import { promptScan } from "./prompt";

interface ResponseJson {
   is_verified: boolean;
   file_path: string;
   source_code: string;
   additional_sources: {
      file_path: string;
      source_code: string;
   }[];
}

export async function GET(request: NextRequest) {
   const address = request.nextUrl.searchParams.get("address");

   if (!address) {
      return NextResponse.json({
         result: "error",
         message: "The address field is required.",
      });
   }

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOCKSCOUT_API_URL}/api/v2/smart-contracts/${address}`
   );
   const json: ResponseJson = await res.json();

   if (!json.is_verified) {
      return NextResponse.json({
         result: "error",
         message: "The contract is not verified",
      });
   }

   let sc = [];
   sc.push(json.file_path);
   sc.push(json.source_code + "\n");

   if (json.additional_sources.length > 0) {
      json.additional_sources.forEach((el) => {
         sc.push(el.file_path);
         sc.push(el.source_code + "\n");
      });
   }

   const result: string = await openrouterRequest(sc.join("\n"), promptScan);
   const output = result.replace("```json", "").replace("```", "");

   return NextResponse.json({
      result: "success",
      data: JSON.parse(output),
   });
}
