"use client"

import { useState } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function PrivacySettings() {
  const [settings, setSettings] = useState({
    analytics: true,
    errorReporting: true,
    usageData: false,
    aiDataCollection: true,
    thirdPartySharing: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage your data and privacy preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Analytics</Label>
              <p className="text-sm text-muted-foreground">Allow collection of anonymous usage statistics</p>
            </div>
            <Switch id="analytics" checked={settings.analytics} onCheckedChange={() => handleToggle("analytics")} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="error-reporting">Error Reporting</Label>
              <p className="text-sm text-muted-foreground">Send anonymous error reports to improve the application</p>
            </div>
            <Switch
              id="error-reporting"
              checked={settings.errorReporting}
              onCheckedChange={() => handleToggle("errorReporting")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="usage-data">Usage Data</Label>
              <p className="text-sm text-muted-foreground">Allow collection of detailed usage data</p>
            </div>
            <Switch id="usage-data" checked={settings.usageData} onCheckedChange={() => handleToggle("usageData")} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-data-collection">AI Data Collection</Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to learn from your interactions to improve responses
              </p>
            </div>
            <Switch
              id="ai-data-collection"
              checked={settings.aiDataCollection}
              onCheckedChange={() => handleToggle("aiDataCollection")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="third-party-sharing">Third-Party Sharing</Label>
              <p className="text-sm text-muted-foreground">Allow sharing of anonymous data with trusted partners</p>
            </div>
            <Switch
              id="third-party-sharing"
              checked={settings.thirdPartySharing}
              onCheckedChange={() => handleToggle("thirdPartySharing")}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete All My Data
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            This will permanently delete all your data from our servers. This action cannot be undone.
          </p>
        </div>
      </CardContent>
    </>
  )
}
