"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useOnboarding } from "./onboarding-provider";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

export const HelpButton: React.FC = () => {
   const { startOnboarding, completedPages } = useOnboarding();
   const router = useRouter();
   const pathname = usePathname();

   const tutorialPages = [
      { path: "/dashboard", label: "Dashboard Tutorial" },
      { path: "/tools", label: "Tools Tutorial" },
      { path: "/dapps", label: "Dapp Explorer Tutorial" },
      { path: "/airdrops", label: "Airdrops Tutorial" },
      { path: "/learn", label: "Learn to Earn Tutorial" },
      { path: "/settings", label: "Settings Tutorial" },
   ];

   const startPageTutorial = (path: string) => {
      router.push(path);
      setTimeout(() => {
         startOnboarding();
      }, 300);
   };

   // Don't show the help button on the assistant page
   if (pathname === "/assistant") {
      return null;
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
               <HelpCircle className="h-5 w-5" />
               <span className="sr-only">Help</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={startOnboarding}>
               Restart Current Tutorial
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPageTutorial("/dashboard")}>
               Dashboard Tutorial
               {completedPages.includes("/dashboard") && (
                  <span className="ml-2 text-xs text-green-500">✓</span>
               )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPageTutorial("/tools")}>
               Tools Tutorial
               {completedPages.includes("/tools") && (
                  <span className="ml-2 text-xs text-green-500">✓</span>
               )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPageTutorial("/dapps")}>
               Dapp Explorer Tutorial
               {completedPages.includes("/dapps") && (
                  <span className="ml-2 text-xs text-green-500">✓</span>
               )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPageTutorial("/airdrops")}>
               Airdrops Tutorial
               {completedPages.includes("/airdrops") && (
                  <span className="ml-2 text-xs text-green-500">✓</span>
               )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPageTutorial("/learn")}>
               Learn to Earn Tutorial
               {completedPages.includes("/learn") && (
                  <span className="ml-2 text-xs text-green-500">✓</span>
               )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPageTutorial("/settings")}>
               Settings Tutorial
               {completedPages.includes("/settings") && (
                  <span className="ml-2 text-xs text-green-500">✓</span>
               )}
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
