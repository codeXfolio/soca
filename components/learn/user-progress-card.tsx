"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

interface UserProgressCardProps {
   xp: number;
   level: number;
   nextLevelXp: number;
   claimableTokens: number;
   onClaimTokens: (amount: number) => void;
}

export function UserProgressCard({
   xp,
   level,
   nextLevelXp,
   claimableTokens,
   onClaimTokens,
}: UserProgressCardProps) {
   const [showClaimDialog, setShowClaimDialog] = useState(false);
   const [isClaiming, setIsClaiming] = useState(false);

   const progressPercentage = Math.min(
      Math.round((xp / nextLevelXp) * 100),
      100
   );

   const handleClaim = () => {
      setIsClaiming(true);

      // Simulate API call
      setTimeout(() => {
         onClaimTokens(claimableTokens);
         setIsClaiming(false);
         setShowClaimDialog(false);
      }, 1500);
   };

   return (
      <>
         <Card className="user-progress-card">
            <CardHeader className="pb-3">
               <CardTitle>Your Learning Progress</CardTitle>
               <CardDescription>
                  Complete lessons and missions to earn XP and tokens
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Star className="h-5 w-5 text-yellow-500" />
                           <span className="font-medium">Total XP</span>
                        </div>
                        <span className="text-xl font-bold">{xp}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <TrendingUp className="h-5 w-5 text-blue-500" />
                           <span className="font-medium">Level</span>
                        </div>
                        <span className="text-xl font-bold">{level}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Coins className="h-5 w-5 text-primary" />
                           <span className="font-medium">Claimable Tokens</span>
                        </div>
                        <span className="text-xl font-bold">
                           {claimableTokens}
                        </span>
                     </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                     <div className="space-y-2">
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium">
                              Level Progress
                           </span>
                           <span className="text-sm font-medium">
                              {progressPercentage}%
                           </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground text-right">
                           {xp} / {nextLevelXp} XP to Level {level + 1}
                        </p>
                     </div>

                     <div className="flex justify-end">
                        <Button
                           onClick={() => setShowClaimDialog(true)}
                           disabled={claimableTokens === 0}
                           className="gap-2"
                        >
                           <Coins className="h-4 w-4" />
                           Claim {claimableTokens} Tokens
                        </Button>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Claim Tokens</DialogTitle>
                  <DialogDescription>
                     You are about to claim {claimableTokens} tokens from your
                     earned XP.
                  </DialogDescription>
               </DialogHeader>
               <div className="py-4">
                  <div className="rounded-lg border p-4 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-primary" />
                        <span className="font-medium">Tokens to claim</span>
                     </div>
                     <span className="text-xl font-bold">
                        {claimableTokens}
                     </span>
                  </div>
               </div>
               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setShowClaimDialog(false)}
                     disabled={isClaiming}
                  >
                     Cancel
                  </Button>
                  <Button
                     onClick={handleClaim}
                     disabled={isClaiming || claimableTokens === 0}
                  >
                     {isClaiming ? "Claiming..." : "Confirm Claim"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
