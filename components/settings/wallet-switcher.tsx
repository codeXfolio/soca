"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Wallet, Plus, Check } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { modalWc } from "@/app/context/appkit";

export function WalletSwitcher() {
   const { allAccounts } = useAppKitAccount();
   const [connectedWallets, setConnectedWallets] = useState([
      { id: "1", name: "MetaMask", address: "0x1234...5678", isActive: true },
      {
         id: "2",
         name: "WalletConnect",
         address: "0x8765...4321",
         isActive: false,
      },
   ]);

   const handleSetActiveWallet = (walletId: string) => {
      setConnectedWallets(
         connectedWallets.map((wallet) => ({
            ...wallet,
            isActive: wallet.id === walletId,
         }))
      );
   };

   const handleDisconnectWallet = (walletId: string) => {
      modalWc.disconnect();
   };

   return (
      <>
         <CardHeader>
            <CardTitle>Connected Wallets</CardTitle>
            <CardDescription>
               Manage your connected wallets and switch between them
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="space-y-4">
               {allAccounts.map((wallet) => (
                  <div
                     key={wallet.address}
                     className="flex items-center justify-between rounded-lg border p-4"
                  >
                     <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                           <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="font-medium">
                              {wallet.type.toUpperCase()}
                           </p>
                           <p className="text-sm text-muted-foreground">
                              {wallet.address}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
               <div className="mt-3">
                  <Button
                     variant="destructive"
                     onClick={() => modalWc.disconnect()}
                     className="w-full"
                  >
                     Disconnect all
                  </Button>
               </div>
            </div>
         </CardContent>
      </>
   );
}
