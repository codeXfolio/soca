"use client";

import { Button } from "@/components/ui/button";
import {
   Coins,
   FileSearch,
   Wallet,
   ArrowRightLeft,
   SendHorizontal,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface CommandSuggestionsProps {
   onCommandClick: (command: string) => void;
}

export function CommandSuggestions({
   onCommandClick,
}: CommandSuggestionsProps) {
   const scrollContainerRef = useRef<HTMLDivElement>(null);
   const [showScrollIndicators, setShowScrollIndicators] = useState(false);

   const commands = [
      {
         label: "Scan Token",
         icon: <FileSearch className="mr-2 h-4 w-4" />,
         query: "Scan this token: 0x1234...",
      },
      {
         label: "Swap ETH to USDC",
         icon: <ArrowRightLeft className="mr-2 h-4 w-4" />,
         query: "Swap 0.1 ETH to USDC",
      },
      {
         label: "Transfer ETH",
         icon: <SendHorizontal className="mr-2 h-4 w-4" />,
         query: "Send 0.05 ETH to 0x1234...5678",
      },
      {
         label: "Check Wallet",
         icon: <Wallet className="mr-2 h-4 w-4" />,
         query: "Check my wallet health",
      },
      {
         label: "Token Price",
         icon: <Coins className="mr-2 h-4 w-4" />,
         query: "What's the current ETH price?",
      },
   ];

   // Check if scroll is needed
   useEffect(() => {
      const checkScroll = () => {
         if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowScrollIndicators(scrollWidth > clientWidth);
         }
      };

      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => window.removeEventListener("resize", checkScroll);
   }, []);

   return (
      <div className="border-t bg-background p-2 command-suggestions">
         {/* Horizontal scrollable container */}
         <div className="relative">
            {/* Left shadow indicator when scrollable */}
            {showScrollIndicators && (
               <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            )}

            <div
               ref={scrollContainerRef}
               className="flex overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
               {commands.map((command) => (
                  <Button
                     key={command.label}
                     variant="outline"
                     size="sm"
                     className="h-8 whitespace-nowrap mr-2 flex-shrink-0 snap-start"
                     onClick={() => onCommandClick(command.query)}
                  >
                     {command.icon}
                     {command.label}
                  </Button>
               ))}
            </div>

            {/* Right shadow indicator when scrollable */}
            {showScrollIndicators && (
               <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            )}
         </div>
      </div>
   );
}
