import { NextResponse } from "next/server";
import { prompt } from "./prompt";
import { openrouterRequest } from "../helper";

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

export async function POST(request: Request) {
   const json = await request.json();
   const { signature, messages } = json;

   if (!messages || messages.length === 0) {
      return NextResponse.json(
         { error: "No messages provided" },
         { status: 400 }
      );
   }

   const result: ResultResponse = await openrouterRequest(messages, prompt);

   if (result.action == "info") {
      return NextResponse.json(result);
   }

   console.log(result);

   return NextResponse.json({ message: "Request sent successfully" });
}
