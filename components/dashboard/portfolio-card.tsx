import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, ImageIcon, TrendingDown, TrendingUp } from "lucide-react";

interface Token {
   symbol: string;
   name: string;
   amount: number;
   value: number;
}

interface PortfolioCardProps {
   tokens: Token[];
}

export function PortfolioCard({ tokens }: PortfolioCardProps) {
   return (
      <Card className="bg-card portfolio-card">
         <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Your assets and holdings</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <div className="space-y-3 pt-4">
               {tokens.map((token, index) => (
                  <div
                     key={index}
                     className="flex items-center justify-between"
                  >
                     <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                           {token.symbol.charAt(0)}
                        </div>
                        <div>
                           <p className="font-medium">{token.name}</p>
                           <p className="text-sm text-muted-foreground">
                              {token.amount < 1
                                 ? token.amount.toFixed(5)
                                 : token.amount}{" "}
                              {token.symbol}
                           </p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="font-medium">
                           ${token.value.toLocaleString()}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
