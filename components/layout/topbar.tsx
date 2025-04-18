"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Bell,
   ChevronDown,
   Menu,
   Moon,
   Sun,
   Wallet,
   Laptop,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { HelpButton } from "@/components/onboarding/help-button";
import {
   useLogin,
   useLogout,
   usePrivy,
   useWallets,
} from "@privy-io/react-auth";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { modalWc } from "@/app/context/appkit";

interface TopbarProps {
   onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
   const { isConnected, address, allAccounts } = useAppKitAccount();
   const { open } = useAppKit();

   const { theme, setTheme } = useTheme();

   function switchTheme(mode: string) {
      modalWc.setThemeMode(
         mode == "system" || mode == "dark" ? "dark" : "light"
      );
      setTheme(mode);
   }

   return (
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-card px-4 md:px-6">
         <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={onMenuToggle}
         >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
         </Button>

         <div className="ml-auto flex items-center gap-4">
            {isConnected && address ? (
               <div className="flex items-center gap-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="gap-2"
                     onClick={() => open({ view: "Account" })}
                  >
                     <Wallet className="h-4 w-4" />
                     {address.slice(0, 6)}...
                     {address.slice(-4)}
                  </Button>
               </div>
            ) : (
               <Button size="sm" onClick={() => open({ view: "Connect" })}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
               </Button>
            )}

            <Button variant="ghost" size="icon" className="relative">
               <Bell className="h-5 w-5" />
               <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            <HelpButton />

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                     <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                     <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                     <span className="sr-only">Toggle theme</span>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => switchTheme("light")}>
                     <Sun className="mr-2 h-4 w-4" />
                     Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchTheme("dark")}>
                     <Moon className="mr-2 h-4 w-4" />
                     Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchTheme("system")}>
                     <Laptop className="mr-2 h-4 w-4" />
                     System
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
}
