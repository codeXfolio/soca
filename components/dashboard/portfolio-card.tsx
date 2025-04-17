import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, ImageIcon, TrendingDown, TrendingUp } from "lucide-react"

interface Token {
  symbol: string
  name: string
  amount: number
  value: number
  change: number
}

interface PortfolioCardProps {
  tokens: Token[]
  totalValue: number
  nftCount: number
}

export function PortfolioCard({ tokens, totalValue, nftCount }: PortfolioCardProps) {
  return (
    <Card className="bg-card portfolio-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Your assets and holdings</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tokens" className="custom-tabs">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="nfts" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              NFTs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tokens" className="mt-4 space-y-4">
            <div className="space-y-3">
              {tokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {token.symbol.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {token.amount} {token.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${token.value.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {token.change > 0 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-500">+{token.change}%</span>
                        </>
                      ) : token.change < 0 ? (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-red-500">{token.change}%</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">0%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="nfts" className="mt-4">
            <div className="rounded-lg border border-dashed p-8 text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 font-medium">NFT Collection</h3>
              <p className="text-sm text-muted-foreground">You have {nftCount} NFTs in your collection</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
