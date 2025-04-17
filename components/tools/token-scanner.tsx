"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Coins } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface TokenScannerProps {
  onClose: () => void
}

export function TokenScanner({ onClose }: TokenScannerProps) {
  const [tokenAddress, setTokenAddress] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<{
    name: string
    symbol: string
    totalSupply: string
    holders: number
    liquidity: string
    score: number
    risks: Array<{ name: string; severity: "high" | "medium" | "low" }>
  } | null>(null)

  const handleScan = () => {
    if (!tokenAddress) return

    setIsScanning(true)

    // Simulate API call
    setTimeout(() => {
      setResult({
        name: "Example Token",
        symbol: "EXT",
        totalSupply: "1,000,000",
        holders: 1250,
        liquidity: "$250,000",
        score: 85,
        risks: [
          { name: "Ownership not renounced", severity: "medium" },
          { name: "Mint function exists", severity: "low" },
        ],
      })
      setIsScanning(false)
    }, 1500)
  }

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Token Scanner</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scan Token</CardTitle>
          <CardDescription>Enter a token address to analyze for risks and opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Token Address (0x...)"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
            <Button onClick={handleScan} disabled={isScanning || !tokenAddress}>
              {isScanning ? "Scanning..." : "Scan Token"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isScanning ? (
        <Card>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </CardContent>
        </Card>
      ) : result ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                {result.name} ({result.symbol})
              </CardTitle>
              <CardDescription>Token overview and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Safety Score</p>
                  <p className="text-sm font-medium">{result.score}/100</p>
                </div>
                <Progress value={result.score} className="h-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Supply</p>
                  <p className="font-medium">{result.totalSupply}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Holders</p>
                  <p className="font-medium">{result.holders.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Liquidity</p>
                  <p className="font-medium">{result.liquidity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Potential risks identified in the token</CardDescription>
            </CardHeader>
            <CardContent>
              {result.risks.length > 0 ? (
                <div className="space-y-4">
                  {result.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-1 ${risk.severity === "high" ? "bg-red-500/10" : risk.severity === "medium" ? "bg-yellow-500/10" : "bg-blue-500/10"}`}
                      >
                        {risk.severity === "high" ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : risk.severity === "medium" ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{risk.name}</p>
                          <Badge variant="outline" className={getSeverityColor(risk.severity)}>
                            {risk.severity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-center">
                  <div>
                    <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                    <p className="mt-2 font-medium">No risks detected</p>
                    <p className="text-sm text-muted-foreground">This token appears to be safe</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
