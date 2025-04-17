"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletSwitcher } from "./wallet-switcher"
import { NotificationSettings } from "./notification-settings"
import { ThemeSelector } from "./theme-selector"
import { LanguageSelector } from "./language-selector"
import { PrivacySettings } from "./privacy-settings"
import { ApiKeysSettings } from "./api-keys-settings"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function SettingsLayout() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("account")

  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="custom-tabs space-y-6">
      <TabsList className="w-full">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="language">Language</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <WalletSwitcher />
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <NotificationSettings />
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

      <TabsContent value="privacy">
        <Card>
          <PrivacySettings />
        </Card>
      </TabsContent>

      <TabsContent value="api-keys">
        <Card>
          <ApiKeysSettings />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
