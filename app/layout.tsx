import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider";
import { PrivyProvider } from "@privy-io/react-auth";
import { soneiumMinato } from "viem/chains";
import "./globals.css";
import { AppKit } from "./context/appkit";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "SOCA - Web3 AI Assistant",
   description: "Your intelligent companion for Web3 interactions",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <OnboardingProvider>
                  <AppKit>
                     {children}
                     <Toaster />
                  </AppKit>
               </OnboardingProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}

import "./globals.css";
