import { NextResponse } from "next/server";
import { prompt } from "./prompt";

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

   const result: ResultResponse = await openrouterRequest(messages);

   if (result.action == "info") {
      return NextResponse.json(result);
   }

   console.log(result);

   return NextResponse.json({ message: "Request sent successfully" });
}

async function openrouterRequest(messages: any) {
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
   return JSON.parse(content);
}
