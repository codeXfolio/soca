"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Coins, Star, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface XPToTokenConverterProps {
  availableXp: number
  conversionRate: number // XP per token
  onConvert: (xp: number, tokens: number) => void
}

export function XPToTokenConverter({ availableXp, conversionRate, onConvert }: XPToTokenConverterProps) {
  const [xpAmount, setXpAmount] = useState(0)
  const [isConverting, setIsConverting] = useState(false)

  const tokenAmount = Math.floor(xpAmount / conversionRate)
  const maxXp = availableXp
  const maxTokens = Math.floor(maxXp / conversionRate)

  const handleSliderChange = (value: number[]) => {
    setXpAmount(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    setXpAmount(Math.min(value, maxXp))
  }

  const handleMaxClick = () => {
    setXpAmount(maxXp)
  }

  const handleConvert = () => {
    if (xpAmount <= 0 || xpAmount > maxXp) return

    setIsConverting(true)

    // Simulate API call
    setTimeout(() => {
      onConvert(xpAmount, tokenAmount)
      setXpAmount(0)
      setIsConverting(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert XP to Tokens</CardTitle>
        <CardDescription>Exchange your earned XP for tokens at a rate of {conversionRate} XP = 1 token</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Available XP</span>
          </div>
          <span className="text-xl font-bold">{availableXp}</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="xp-amount" className="text-sm font-medium">
                XP to Convert
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="xp-amount"
                  type="number"
                  value={xpAmount}
                  onChange={handleInputChange}
                  className="w-24 h-8"
                  min={0}
                  max={maxXp}
                />
                <Button variant="outline" size="sm" onClick={handleMaxClick} className="h-8">
                  Max
                </Button>
              </div>
            </div>
            <Slider value={[xpAmount]} max={maxXp} step={conversionRate} onValueChange={handleSliderChange} />
          </div>

          <div className="flex items-center justify-center gap-4 py-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-bold">{xpAmount}</span>
              </div>
              <span className="text-sm text-muted-foreground">XP</span>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Coins className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold">{tokenAmount}</span>
              </div>
              <span className="text-sm text-muted-foreground">Tokens</span>
            </div>
          </div>

          {xpAmount > 0 && (
            <Alert variant="outline" className="bg-blue-500/10 border-blue-500/20">
              <AlertDescription className="text-sm">
                You are about to convert <span className="font-medium">{xpAmount} XP</span> into{" "}
                <span className="font-medium">{tokenAmount} tokens</span>. This action cannot be undone.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2" onClick={handleConvert} disabled={xpAmount <= 0 || isConverting}>
          <Coins className="h-4 w-4" />
          {isConverting ? "Converting..." : "Convert to Tokens"}
        </Button>
      </CardFooter>
    </Card>
  )
}
