import { ethers } from "ethers";

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
