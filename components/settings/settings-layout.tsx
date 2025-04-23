"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletSwitcher } from "./wallet-switcher";
import { ThemeSelector } from "./theme-selector";
import { LanguageSelector } from "./language-selector";
import { ApiKeysSettings } from "./api-keys-settings";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function SettingsLayout() {
   const [activeTab, setActiveTab] = useState("account");

   return (
      <Tabs
         defaultValue={activeTab}
         value={activeTab}
         onValueChange={setActiveTab}
         className="custom-tabs space-y-6"
      >
         <TabsList className="w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
         </TabsList>

         <TabsContent value="account">
            <Card>
               <WalletSwitcher />
            </Card>
         </TabsContent>

         <TabsContent value="appearance">
            <Card>
               <ThemeSelector />
            </Card>
         </TabsContent>

         <TabsContent value="language">
            <Card>
               <LanguageSelector />
            </Card>
         </TabsContent>

         <TabsContent value="api-keys">
            <Card>
               <ApiKeysSettings />
            </Card>
         </TabsContent>
      </Tabs>
   );
}
