"use client"

import { useState } from "react"
import { ToolCard } from "./tool-card"
import { ContractAnalyzer } from "./contract-analyzer"
import { TokenScanner } from "./token-scanner"
import { WalletTracker } from "./wallet-tracker"
import { FileSearch, Wallet, Code } from "lucide-react"

type ToolType = "contract-analyzer" | "token-scanner" | "wallet-tracker" | null

export function ToolList() {
  const [activeTool, setActiveTool] = useState<ToolType>(null)

  const tools = [
    {
      id: "contract-analyzer",
      name: "Contract Analyzer",
      description: "Decode and analyze smart contract functions",
      icon: <Code className="h-6 w-6" />,
    },
    {
      id: "token-scanner",
      name: "Token Scanner",
      description: "Analyze tokens for risks and opportunities",
      icon: <FileSearch className="h-6 w-6" />,
    },
    {
      id: "wallet-tracker",
      name: "Wallet Tracker",
      description: "Track wallet assets and transaction history",
      icon: <Wallet className="h-6 w-6" />,
    },
  ]

  const renderActiveTool = () => {
    switch (activeTool) {
      case "contract-analyzer":
        return <ContractAnalyzer onClose={() => setActiveTool(null)} />
      case "token-scanner":
        return <TokenScanner onClose={() => setActiveTool(null)} />
      case "wallet-tracker":
        return <WalletTracker onClose={() => setActiveTool(null)} />
      default:
        return null
    }
  }

  return (
    <div>
      {activeTool ? (
        renderActiveTool()
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              name={tool.name}
              description={tool.description}
              onClick={() => setActiveTool(tool.id as ToolType)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
