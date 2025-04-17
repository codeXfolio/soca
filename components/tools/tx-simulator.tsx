"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface TxSimulatorProps {
  onClose: () => void
}

export function TxSimulator({ onClose }: TxSimulatorProps) {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [gasLimit, setGasLimit] = useState("21000")
  const [isSimulating, setIsSimulating] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    gasUsed: string
    warnings: string[]
    errors: string[]
  } | null>(null)

  const handleSimulate = () => {
    if (!address || !amount) return

    setIsSimulating(true)

    // Simulate API call
    setTimeout(() => {
      setResult({
        success: true,
        gasUsed: "21000",
        warnings: ["Contract has not been audited"],
        errors: [],
      })
      setIsSimulating(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Transaction Simulator</h2>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Parameters</CardTitle>
            <CardDescription>Enter transaction details to simulate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Contract Address</Label>
              <Input id="address" placeholder="0x..." value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gas-limit">Gas Limit</Label>
              <Input
                id="gas-limit"
                placeholder="21000"
                value={gasLimit}
                onChange={(e) => setGasLimit(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSimulate} disabled={isSimulating || !address || !amount}>
              {isSimulating ? "Simulating..." : "Simulate Transaction"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>Preview of transaction outcome</CardDescription>
          </CardHeader>
          <CardContent>
            {isSimulating ? (
              <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500/10 p-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Transaction would succeed</p>
                    <p className="text-sm text-muted-foreground">Gas used: {result.gasUsed}</p>
                  </div>
                </div>

                <Separator />

                {result.warnings.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-medium">Warnings</p>
                    {result.warnings.map((warning, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                )}

                {result.errors.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-medium">Errors</p>
                    {result.errors.map((error, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-center text-muted-foreground">
                <div>
                  <p>No simulation results yet</p>
                  <p className="text-sm">Enter transaction details and click Simulate</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
