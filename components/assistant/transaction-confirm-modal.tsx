"use client";

import React from "react";

import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
   AlertTriangle,
   ArrowRightLeft,
   Check,
   ExternalLink,
   Loader2,
   SendHorizontal,
} from "lucide-react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";

export interface TransactionDetails {
   type: "swap" | "transfer" | "approve";
   fromToken?: {
      symbol: string;
      amount: string;
      value?: string;
   };
   toToken?: {
      symbol: string;
      amount: string;
      value?: string;
   };
   recipient?: string;
   estimatedGas: string;
   network: string;
   provider?: string; // Added provider field
   routeInfo?: {
      route: string[];
      fee: string;
   };
}

interface TransactionConfirmModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   transaction: TransactionDetails;
}

export function TransactionConfirmModal({
   isOpen,
   onClose,
   onConfirm,
   transaction,
}: TransactionConfirmModalProps) {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const { address, isConnected } = useAppKitAccount();
   const { walletProvider } = useAppKitProvider("eip155");

   const handleConfirm = async () => {
      setIsSubmitting(true);

      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      const signer = await provider.getSigner();

      if (transaction.type === "transfer" && isConnected) {
         const tx = await signer.sendTransaction({
            to: transaction.recipient,
            value: ethers.parseEther(transaction.fromToken?.amount || "0"),
         });
         await tx.wait();
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
         setIsSuccess(false);
         onConfirm();
      }, 2000);
   };

   const renderTransactionIcon = () => {
      switch (transaction.type) {
         case "swap":
            return <ArrowRightLeft className="h-5 w-5" />;
         case "transfer":
            return <SendHorizontal className="h-5 w-5" />;
         case "approve":
            return <Check className="h-5 w-5" />;
      }
   };

   const renderTransactionTitle = () => {
      switch (transaction.type) {
         case "swap":
            return `Swap ${transaction.fromToken?.symbol} to ${transaction.toToken?.symbol}`;
         case "transfer":
            return `Transfer ${transaction.fromToken?.symbol}`;
         case "approve":
            return `Approve ${transaction.fromToken?.symbol}`;
      }
   };

   const renderTransactionDescription = () => {
      switch (transaction.type) {
         case "swap":
            return `You are about to swap ${transaction.fromToken?.amount} ${transaction.fromToken?.symbol} for approximately ${transaction.toToken?.amount} ${transaction.toToken?.symbol}.`;
         case "transfer":
            return `You are about to transfer ${transaction.fromToken?.amount} ${transaction.fromToken?.symbol} to ${transaction.recipient}.`;
         case "approve":
            return `You are about to approve the spending of your ${transaction.fromToken?.symbol} tokens.`;
      }
   };

   return (
      <Dialog
         open={isOpen}
         onOpenChange={(open) => {
            if (!open && !isSubmitting) onClose();
         }}
      >
         <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                     {renderTransactionIcon()}
                  </div>
                  {renderTransactionTitle()}
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
               {transaction.type === "swap" && (
                  <div className="rounded-lg border p-4">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm text-muted-foreground">From</p>
                           <div className="flex items-center gap-2">
                              <span className="text-lg font-medium">
                                 {transaction.fromToken?.amount}
                              </span>
                              <Badge variant="outline">
                                 {transaction.fromToken?.symbol}
                              </Badge>
                           </div>
                           {transaction.fromToken?.value && (
                              <p className="text-sm text-muted-foreground">
                                 (≈${transaction.fromToken.value})
                              </p>
                           )}
                        </div>
                        <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                        <div className="text-right">
                           <p className="text-sm text-muted-foreground">To</p>
                           <div className="flex items-center gap-2 justify-end">
                              <span className="text-lg font-medium">
                                 {transaction.toToken?.amount}
                              </span>
                              <Badge variant="outline">
                                 {transaction.toToken?.symbol}
                              </Badge>
                           </div>
                           {transaction.toToken?.value && (
                              <p className="text-sm text-muted-foreground">
                                 (≈${transaction.toToken.value})
                              </p>
                           )}
                        </div>
                     </div>

                     {/* Provider information */}
                     {transaction.provider && (
                        <div className="mt-4 pt-3 border-t">
                           <div className="flex justify-between items-center">
                              <p className="text-sm text-muted-foreground">
                                 Provider
                              </p>
                              <Badge
                                 variant="outline"
                                 className="bg-primary/10 text-primary border-primary/20"
                              >
                                 {transaction.provider}
                              </Badge>
                           </div>

                           {transaction.routeInfo && (
                              <div className="mt-2">
                                 <p className="text-sm text-muted-foreground">
                                    Route
                                 </p>
                                 <div className="flex items-center gap-1 mt-1 text-sm">
                                    {transaction.routeInfo.route.map(
                                       (step, index) => (
                                          <React.Fragment key={index}>
                                             <Badge
                                                variant="outline"
                                                className="text-xs"
                                             >
                                                {step}
                                             </Badge>
                                             {index <
                                                transaction.routeInfo!.route
                                                   .length -
                                                   1 && (
                                                <ArrowRightLeft className="h-3 w-3 text-muted-foreground mx-1" />
                                             )}
                                          </React.Fragment>
                                       )
                                    )}
                                 </div>
                                 <p className="text-xs text-muted-foreground mt-1">
                                    Fee: {transaction.routeInfo.fee}
                                 </p>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               )}

               {transaction.type === "transfer" && (
                  <div className="rounded-lg border p-4">
                     <div className="flex flex-col gap-2">
                        <div>
                           <p className="text-sm text-muted-foreground">
                              Amount
                           </p>
                           <div className="flex items-center gap-2">
                              <span className="text-lg font-medium">
                                 {transaction.fromToken?.amount}
                              </span>
                              <Badge variant="outline">
                                 {transaction.fromToken?.symbol}
                              </Badge>
                           </div>
                           {transaction.fromToken?.value && (
                              <p className="text-sm text-muted-foreground">
                                 (≈${transaction.fromToken.value})
                              </p>
                           )}
                        </div>

                        <div>
                           <p className="text-sm text-muted-foreground">
                              Recipient
                           </p>
                           <p className="font-mono text-sm truncate">
                              {transaction.recipient}
                           </p>
                        </div>
                     </div>
                  </div>
               )}

               <div>
                  <div className="flex justify-between py-1">
                     <p className="text-sm text-muted-foreground">Network</p>
                     <p className="text-sm font-medium">
                        {transaction.network}
                     </p>
                  </div>
                  <div className="flex justify-between py-1">
                     <p className="text-sm text-muted-foreground">
                        Estimated Gas
                     </p>
                     <p className="text-sm font-medium">
                        {transaction.estimatedGas}
                     </p>
                  </div>
               </div>

               <Separator />

               <Alert className="border-yellow-500/20 bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-sm text-yellow-500">
                     Always verify transaction details before confirming. This
                     cannot be undone.
                  </AlertDescription>
               </Alert>
            </div>

            <DialogFooter className="flex items-center gap-2">
               {isSuccess ? (
                  <div className="flex w-full items-center justify-center gap-2 text-green-500">
                     <Check className="h-5 w-5" />
                     <span>Transaction submitted successfully!</span>
                  </div>
               ) : (
                  <>
                     <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1"
                     >
                        Cancel
                     </Button>
                     <Button
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className="flex-1"
                     >
                        {isSubmitting ? (
                           <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Confirming...
                           </>
                        ) : (
                           "Confirm Transaction"
                        )}
                     </Button>
                  </>
               )}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
