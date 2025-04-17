import { NetworkStatusBar } from "./network-status-bar"
import { PortfolioCard } from "./portfolio-card"
import { RecentActivityCard } from "./recent-activity-card"
import { StatCard } from "./stat-card"
import { BarChart3, Coins, ImageIcon, LinkIcon } from "lucide-react"

export function DashboardOverview() {
  // Mock data
  const tokens = [
    { symbol: "ETH", name: "Ethereum", amount: 1.45, value: 4350, change: 2.5 },
    { symbol: "USDC", name: "USD Coin", amount: 2500, value: 2500, change: 0 },
    { symbol: "LINK", name: "Chainlink", amount: 150, value: 1875, change: -1.2 },
    { symbol: "UNI", name: "Uniswap", amount: 75, value: 450, change: 5.8 },
  ]

  const transactions = [
    { type: "Swap", time: "10 mins ago", amount: "0.5 ETH → 1500 USDC", status: "completed" },
    { type: "Send", time: "2 hours ago", amount: "0.1 ETH", status: "completed" },
    { type: "NFT Purchase", time: "1 day ago", amount: "0.08 ETH", status: "completed" },
    { type: "Stake", time: "3 days ago", amount: "10 UNI", status: "completed" },
    { type: "Claim", time: "1 week ago", amount: "25 LINK", status: "completed" },
  ]

  const stats = [
    { title: "Total Portfolio Value", value: "$12,450", icon: <Coins className="h-4 w-4" />, change: 5.7 },
    { title: "Staked Assets", value: "$3,280", icon: <LinkIcon className="h-4 w-4" />, change: 2.3 },
    { title: "Soneium Rewards", value: "245 SON", icon: <ImageIcon className="h-4 w-4" />, change: 8.5 },
    { title: "Transaction Count", value: "32", icon: <BarChart3 className="h-4 w-4" />, change: null },
  ]

  return (
    <div className="space-y-6">
      <NetworkStatusBar />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} change={stat.change} />
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <PortfolioCard tokens={tokens} totalValue={9175} nftCount={12} />
        <RecentActivityCard transactions={transactions} />
      </div>
    </div>
  )
}
