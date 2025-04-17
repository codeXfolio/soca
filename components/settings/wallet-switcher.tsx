"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Plus, Check } from "lucide-react"

export function WalletSwitcher() {
  const [connectedWallets, setConnectedWallets] = useState([
    { id: "1", name: "MetaMask", address: "0x1234...5678", isActive: true },
    { id: "2", name: "WalletConnect", address: "0x8765...4321", isActive: false },
  ])

  const handleSetActiveWallet = (walletId: string) => {
    setConnectedWallets(
      connectedWallets.map((wallet) => ({
        ...wallet,
        isActive: wallet.id === walletId,
      })),
    )
  }

  const handleDisconnectWallet = (walletId: string) => {
    setConnectedWallets(connectedWallets.filter((wallet) => wallet.id !== walletId))
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Connected Wallets</CardTitle>
        <CardDescription>Manage your connected wallets and switch between them</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {connectedWallets.map((wallet) => (
            <div key={wallet.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{wallet.name}</p>
                  <p className="text-sm text-muted-foreground">{wallet.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {wallet.isActive ? (
                  <Button variant="outline" size="sm" className="gap-1" disabled>
                    <Check className="h-4 w-4" />
                    Active
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleSetActiveWallet(wallet.id)}>
                    Set Active
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => handleDisconnectWallet(wallet.id)}>
                  Disconnect
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Connect New Wallet
        </Button>
      </CardContent>
    </>
  )
}
