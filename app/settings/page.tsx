import { SettingsLayout } from "@/components/settings/settings-layout"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and account settings</p>
      </div>
      <SettingsLayout />
    </div>
  )
}
