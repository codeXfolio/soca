import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"
import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  change: number | null
}

export function StatCard({ title, value, icon, change }: StatCardProps) {
  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-primary/10 p-2">{icon}</span>
          {change !== null && (
            <div className="flex items-center gap-1 text-xs font-medium">
              {change > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{change}%</span>
                </>
              ) : change < 0 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{change}%</span>
                </>
              ) : (
                <span className="text-muted-foreground">0%</span>
              )}
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
