import { LearnToEarnLayout } from "@/components/learn/learn-to-earn-layout"

export default function LearnToEarnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learn to Earn</h1>
        <p className="text-muted-foreground">Complete lessons and missions to earn XP and tokens</p>
      </div>
      <LearnToEarnLayout />
    </div>
  )
}
