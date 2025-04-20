"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Code } from "lucide-react";

interface ContractAnalyzerProps {
   onClose: () => void;
}

export function ContractAnalyzer({ onClose }: ContractAnalyzerProps) {
   const [address, setAddress] = useState("");
   const [isAnalyzing, setIsAnalyzing] = useState(false);
   const [result, setResult] = useState<{
      name: string;
      functions: Array<{
         name: string;
         inputs: Array<{ name: string; type: string }>;
         outputs: Array<{ type: string }>;
         stateMutability: string;
      }>;
      events: Array<{
         name: string;
         inputs: Array<{ name: string; type: string; indexed: boolean }>;
      }>;
   } | null>(null);
   const [error, setError] = useState<string | null>(null);

   const handleAnalyze = async () => {
      if (!address) return;

      setIsAnalyzing(true);
      setError(null);

      const res = await fetch(
         `https://soneium-minato.blockscout.com/api/v2/smart-contracts/${address}`
      );
      if (!res.ok) {
         setIsAnalyzing(false);
         setError("Failed to fetch contract data");
         return;
      }
      const data: { name: string; is_verified: boolean; abi: any[] } =
         await res.json();

      if (!data.is_verified) {
         setIsAnalyzing(false);
         setError("Contract is not verified");
         return;
      }

      setResult({
         name: data.name,
         functions: data.abi.filter((item: any) => item.type === "function"),
         events: data.abi.filter((item: any) => item.type === "event"),
      });
      setIsAnalyzing(false);
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
               <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Contract Analyzer</h2>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Analyze Smart Contract</CardTitle>
               <CardDescription>
                  Enter a contract address to decode its ABI and functions
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex gap-2">
                  <div className="flex-1">
                     <Input
                        placeholder="Contract Address (0x...)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                  </div>
                  <Button
                     onClick={handleAnalyze}
                     disabled={isAnalyzing || !address}
                  >
                     {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </Button>
               </div>
            </CardContent>
         </Card>

         {error && (
            <Card>
               <CardContent className="text-red-500 flex justify-center py-10">
                  <h2 className="text-xl">{error}</h2>
               </CardContent>
            </Card>
         )}

         {isAnalyzing ? (
            <Card>
               <CardContent className="flex h-[300px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
               </CardContent>
            </Card>
         ) : result ? (
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Code className="h-5 w-5" />
                     {result.name}
                  </CardTitle>
                  <CardDescription>
                     Contract interface and functions
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Tabs defaultValue="functions" className="custom-tabs">
                     <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="functions">Functions</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                     </TabsList>
                     <TabsContent value="functions" className="mt-4 space-y-4">
                        {result.functions.map((func, index) => (
                           <div key={index} className="rounded-lg border p-4">
                              <div className="flex items-center justify-between">
                                 <h3 className="font-medium">{func.name}</h3>
                                 <Badge
                                    variant={
                                       func.stateMutability === "view"
                                          ? "outline"
                                          : "default"
                                    }
                                 >
                                    {func.stateMutability}
                                 </Badge>
                              </div>
                              <div className="mt-2 space-y-2">
                                 <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                       Inputs
                                    </p>
                                    {func.inputs.length > 0 ? (
                                       <ul className="mt-1 space-y-1">
                                          {func.inputs.map((input, i) => (
                                             <li key={i} className="text-sm">
                                                {input.name}:{" "}
                                                <span className="text-blue-500">
                                                   {input.type}
                                                </span>
                                             </li>
                                          ))}
                                       </ul>
                                    ) : (
                                       <p className="text-sm">None</p>
                                    )}
                                 </div>
                                 <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                       Outputs
                                    </p>
                                    {func.outputs.length > 0 ? (
                                       <ul className="mt-1 space-y-1">
                                          {func.outputs.map((output, i) => (
                                             <li key={i} className="text-sm">
                                                <span className="text-green-500">
                                                   {output.type}
                                                </span>
                                             </li>
                                          ))}
                                       </ul>
                                    ) : (
                                       <p className="text-sm">None</p>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </TabsContent>
                     <TabsContent value="events" className="mt-4 space-y-4">
                        {result.events.map((event, index) => (
                           <div key={index} className="rounded-lg border p-4">
                              <h3 className="font-medium">{event.name}</h3>
                              <div className="mt-2">
                                 <p className="text-sm font-medium text-muted-foreground">
                                    Parameters
                                 </p>
                                 <ul className="mt-1 space-y-1">
                                    {event.inputs.map((input, i) => (
                                       <li
                                          key={i}
                                          className="flex items-center gap-2 text-sm"
                                       >
                                          {input.name}:{" "}
                                          <span className="text-blue-500">
                                             {input.type}
                                          </span>
                                          {input.indexed && (
                                             <Badge
                                                variant="outline"
                                                className="text-xs"
                                             >
                                                indexed
                                             </Badge>
                                          )}
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        ))}
                     </TabsContent>
                  </Tabs>
               </CardContent>
            </Card>
         ) : null}
      </div>
   );
}
