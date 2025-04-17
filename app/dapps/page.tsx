import { DappExplorer } from "@/components/dapps/dapp-explorer"

export default function DappsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dapp Explorer</h1>
        <p className="text-muted-foreground">Discover and interact with decentralized applications</p>
      </div>
      <DappExplorer />
    </div>
  )
}
