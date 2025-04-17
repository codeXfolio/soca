import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, ImageIcon, Coins, ArrowRightLeft } from "lucide-react"

interface Transaction {
  type: string
  time: string
  amount: string
  status: string
}

interface RecentActivityCardProps {
  transactions: Transaction[]
}

export function RecentActivityCard({ transactions }: RecentActivityCardProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Send":
        return <ArrowUpRight className="h-4 w-4" />
      case "Receive":
        return <ArrowDownLeft className="h-4 w-4" />
      case "Swap":
        return <ArrowRightLeft className="h-4 w-4" />
      case "NFT Purchase":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <Coins className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-card recent-activity-card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                {getTransactionIcon(tx.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{tx.type}</p>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    {tx.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">{tx.time}</p>
                  <p>{tx.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
