import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Soneium Chat - Web3 AI Assistant",
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
                  {children}
                  <Toaster />
               </OnboardingProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}

import "./globals.css";
