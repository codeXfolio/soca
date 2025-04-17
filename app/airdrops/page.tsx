import { AirdropExplorer } from "@/components/airdrops/airdrop-explorer"

export default function AirdropPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Airdrop Explorer</h1>
        <p className="text-muted-foreground">Discover active and upcoming token airdrops</p>
      </div>
      <AirdropExplorer />
    </div>
  )
}
