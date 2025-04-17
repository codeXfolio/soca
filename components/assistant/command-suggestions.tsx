"use client"

import { Button } from "@/components/ui/button"
import { Coins, FileSearch, Wallet, ArrowRightLeft, SendHorizontal } from "lucide-react"

interface CommandSuggestionsProps {
  onCommandClick: (command: string) => void
}

export function CommandSuggestions({ onCommandClick }: CommandSuggestionsProps) {
  const commands = [
    { label: "Scan Token", icon: <FileSearch className="mr-2 h-4 w-4" />, query: "Scan this token: 0x1234..." },
    { label: "Swap ETH to USDC", icon: <ArrowRightLeft className="mr-2 h-4 w-4" />, query: "Swap 0.1 ETH to USDC" },
    {
      label: "Transfer ETH",
      icon: <SendHorizontal className="mr-2 h-4 w-4" />,
      query: "Send 0.05 ETH to 0x1234...5678",
    },
    { label: "Check Wallet", icon: <Wallet className="mr-2 h-4 w-4" />, query: "Check my wallet health" },
    { label: "Token Price", icon: <Coins className="mr-2 h-4 w-4" />, query: "What's the current ETH price?" },
  ]

  return (
    <div className="border-t bg-background p-2 command-suggestions">
      <div className="flex flex-wrap gap-2">
        {commands.map((command) => (
          <Button
            key={command.label}
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => onCommandClick(command.query)}
          >
            {command.icon}
            {command.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
