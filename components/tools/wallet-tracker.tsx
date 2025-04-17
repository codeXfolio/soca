"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Wallet, Coins, Activity, ArrowRightLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface WalletTrackerProps {
  onClose: () => void
}

export function WalletTracker({ onClose }: WalletTrackerProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [result, setResult] = useState<{
    assets: Array<{
      symbol: string
      name: string
      balance: string
      value: string
    }>
    transactions: Array<{
      type: string
      hash: string
      time: string
      value: string
    }>
    stats: {
      totalValue: string
      transactionCount: number
      firstActivity: string
      chains: string[]
    }
  } | null>(null)

  const handleTrack = () => {
    if (!walletAddress) return

    setIsTracking(true)

    // Simulate API call
    setTimeout(() => {
      setResult({
        assets: [
          { symbol: "ETH", name: "Ethereum", balance: "2.5", value: "$7,500" },
          { symbol: "USDC", name: "USD Coin", balance: "5,000", value: "$5,000" },
          { symbol: "LINK", name: "Chainlink", balance: "100", value: "$1,250" },
        ],
        transactions: [
          { type: "Send", hash: "0x1234...5678", time: "2 hours ago", value: "0.5 ETH" },
          { type: "Receive", hash: "0x8765...4321", time: "1 day ago", value: "1,000 USDC" },
          { type: "Swap", hash: "0x9876...5432", time: "3 days ago", value: "0.2 ETH → 250 USDC" },
          { type: "NFT Purchase", hash: "0x5432...9876", time: "1 week ago", value: "0.1 ETH" },
        ],
        stats: {
          totalValue: "$13,750",
          transactionCount: 42,
          firstActivity: "Jan 15, 2023",
          chains: ["Ethereum", "Polygon", "Arbitrum"],
        },
      })
      setIsTracking(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Wallet Tracker</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track Wallet</CardTitle>
          <CardDescription>Enter a wallet address to view assets and transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Wallet Address (0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
            <Button onClick={handleTrack} disabled={isTracking || !walletAddress}>
              {isTracking ? "Tracking..." : "Track Wallet"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isTracking ? (
        <Card>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </CardContent>
        </Card>
      ) : result ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Overview
              </CardTitle>
              <CardDescription>Summary of wallet activity and holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">{result.stats.totalValue}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{result.stats.transactionCount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">First Activity</p>
                  <p className="text-2xl font-bold">{result.stats.firstActivity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Networks</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {result.stats.chains.map((chain, index) => (
                      <Badge key={index} variant="outline">
                        {chain}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="assets" className="custom-tabs">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assets" className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Transactions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assets" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {result.assets.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                            {asset.symbol.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {asset.balance} {asset.symbol}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">{asset.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {result.transactions.map((tx, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          {tx.type === "Send" ? (
                            <ArrowLeft className="h-4 w-4" />
                          ) : tx.type === "Receive" ? (
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                          ) : tx.type === "Swap" ? (
                            <ArrowRightLeft className="h-4 w-4" />
                          ) : (
                            <Image
                              src="/placeholder.svg"
                              width={16}
                              height={16}
                              alt="Transaction Type"
                              className="h-4 w-4"
                            />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{tx.type}</p>
                            <p>{tx.value}</p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <p className="text-muted-foreground">{tx.time}</p>
                            <p className="text-muted-foreground truncate max-w-[150px]">{tx.hash}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : null}
    </div>
  )
}
