"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Bot, ArrowRightLeft, SendHorizontal, History, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function AssistantToolTip() {
   const capabilities = [
      {
         title: "Token Swap",
         description: "Swap tokens easily with the best rates across exchanges",
         icon: <ArrowRightLeft className="h-5 w-5" />,
      },
      {
         title: "Token Transfer",
         description: "Send tokens to any wallet address securely and quickly",
         icon: <SendHorizontal className="h-5 w-5" />,
      },
      {
         title: "Transaction History",
         description: "View all your past swaps and transfers in one place",
         icon: <History className="h-5 w-5" />,
      },
   ];

   return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
         <Card className="mx-auto max-w-md relative">
            <Button
               variant="ghost"
               size="icon"
               className="absolute right-2 top-2"
               onClick={() => {
                  document.dispatchEvent(
                     new CustomEvent("dismissAssistantTooltip")
                  );
                  localStorage.setItem("assistantTooltipDismissed", "true");
               }}
            >
               <X className="h-4 w-4" />
               <span className="sr-only">Close</span>
            </Button>
            <CardHeader className="text-center">
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
               </div>
               <CardTitle className="mt-2">Your Soneium AI Assistant</CardTitle>
               <CardDescription>
                  I can help you navigate the Web3 ecosystem safely and
                  efficiently
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {capabilities.map((capability, index) => (
                     <div key={index} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                           {capability.icon}
                        </div>
                        <div>
                           <h3 className="font-medium">{capability.title}</h3>
                           <p className="text-sm text-muted-foreground">
                              {capability.description}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
