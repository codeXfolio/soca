"use client";

import { useState } from "react";
import {
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ApiKeysSettings() {
   const { toast } = useToast();
   const [openRouterKey, setOpenRouterKey] = useState(
      window.localStorage.getItem("openrouter.key") || ""
   );
   const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
   const [isSaving, setIsSaving] = useState(false);

   const handleSaveKeys = () => {
      setIsSaving(true);

      window.localStorage.setItem("openrouter.key", openRouterKey);

      setIsSaving(false);
      toast({
         title: "API Keys Saved",
         description: "Your API keys have been saved successfully.",
      });
   };

   return (
      <>
         <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
               Configure API keys for different AI providers
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="space-y-4">
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                     <Key className="h-4 w-4 text-primary" />
                     <Label htmlFor="openrouter-key" className="font-medium">
                        OpenRouter API Key
                     </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                     OpenRouter provides access to multiple AI models through a
                     single API.
                     <a
                        href="https://openrouter.ai/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-primary hover:underline"
                     >
                        Get your API key
                     </a>
                  </p>
                  <div className="flex gap-2">
                     <div className="relative flex-1">
                        <Input
                           id="openrouter-key"
                           type={showOpenRouterKey ? "text" : "password"}
                           placeholder="sk-or-..."
                           value={openRouterKey}
                           onChange={(e) => setOpenRouterKey(e.target.value)}
                        />
                        <Button
                           type="button"
                           variant="ghost"
                           size="icon"
                           className="absolute right-2 top-1/2 -translate-y-1/2"
                           onClick={() =>
                              setShowOpenRouterKey(!showOpenRouterKey)
                           }
                        >
                           {showOpenRouterKey ? (
                              <EyeOff className="h-4 w-4" />
                           ) : (
                              <Eye className="h-4 w-4" />
                           )}
                           <span className="sr-only">
                              {showOpenRouterKey ? "Hide" : "Show"} OpenRouter
                              API key
                           </span>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-end">
               <Button
                  onClick={handleSaveKeys}
                  disabled={isSaving}
                  className="gap-2"
               >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save API Keys"}
               </Button>
            </div>

            <div className="rounded-md bg-muted p-4 text-sm">
               <p className="font-medium">Security Note</p>
               <p className="mt-1 text-muted-foreground">
                  Your API keys are stored securely in your browser's local
                  storage and are only used to make requests to the respective
                  AI providers. We never store your API keys on our servers.
               </p>
            </div>
         </CardContent>
      </>
   );
}
