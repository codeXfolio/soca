"use client"

import { useState } from "react"
import { AirdropCard } from "./airdrop-card"
import { AirdropFilters } from "./airdrop-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Gift } from "lucide-react"
import { Pagination } from "@/components/dapps/pagination"

// Mock airdrop data
const mockAirdrops = [
  // Active airdrops
  {
    id: "1",
    name: "Arbitrum Odyssey",
    tokenSymbol: "ARB",
    tokenAmount: 750,
    tokenValue: 525,
    requirements: ["Ethereum transactions", "Arbitrum bridge usage"],
    endDate: "2025-05-15",
    image: "/placeholder.svg?height=80&width=80",
    description: "Claim your ARB tokens for participating in the Arbitrum Odyssey program.",
    chainId: "arbitrum",
    status: "active",
    eligibility: "Ethereum users who bridged to Arbitrum before March 2023",
    totalAllocation: "50,000,000 ARB",
    website: "https://arbitrum.io",
    difficulty: "medium",
  },
  {
    id: "2",
    name: "Optimism Collective",
    tokenSymbol: "OP",
    tokenAmount: 500,
    tokenValue: 350,
    requirements: ["Governance participation", "OP Mainnet usage"],
    endDate: "2025-05-20",
    image: "/placeholder.svg?height=80&width=80",
    description: "Reward for active participation in Optimism governance and usage.",
    chainId: "optimism",
    status: "active",
    eligibility: "Active Optimism governance participants",
    totalAllocation: "25,000,000 OP",
    website: "https://optimism.io",
    difficulty: "hard",
  },
  {
    id: "3",
    name: "Base Pioneers",
    tokenSymbol: "BASE",
    tokenAmount: 1000,
    tokenValue: 200,
    requirements: ["Early adoption", "NFT minting"],
    endDate: "2025-06-01",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for early Base network adopters and NFT enthusiasts.",
    chainId: "base",
    status: "active",
    eligibility: "Early Base network users who minted NFTs",
    totalAllocation: "100,000,000 BASE",
    website: "https://base.org",
    difficulty: "easy",
  },
  {
    id: "4",
    name: "ZkSync Era Launch",
    tokenSymbol: "ZKS",
    tokenAmount: 250,
    tokenValue: 625,
    requirements: ["Layer 2 transactions", "zkSync usage"],
    endDate: "2025-05-10",
    image: "/placeholder.svg?height=80&width=80",
    description: "Claim tokens for being an early adopter of zkSync Era.",
    chainId: "zksync",
    status: "active",
    eligibility: "Users with at least 5 transactions on zkSync Era",
    totalAllocation: "30,000,000 ZKS",
    website: "https://zksync.io",
    difficulty: "medium",
  },
  {
    id: "9",
    name: "Polygon zkEVM Rewards",
    tokenSymbol: "MATIC",
    tokenAmount: 300,
    tokenValue: 180,
    requirements: ["zkEVM transactions", "Bridge usage"],
    endDate: "2025-05-25",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for early adopters of Polygon zkEVM technology.",
    chainId: "polygon",
    status: "active",
    eligibility: "Users who completed at least 5 transactions on Polygon zkEVM",
    totalAllocation: "20,000,000 MATIC",
    website: "https://polygon.technology",
    difficulty: "easy",
  },
  {
    id: "10",
    name: "Celestia Data Availability",
    tokenSymbol: "TIA",
    tokenAmount: 450,
    tokenValue: 900,
    requirements: ["Data posting", "Validator participation"],
    endDate: "2025-06-10",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for contributing to Celestia's data availability network.",
    chainId: "celestia",
    status: "active",
    eligibility: "Early data availability providers and validators",
    totalAllocation: "15,000,000 TIA",
    website: "https://celestia.org",
    difficulty: "hard",
  },
  {
    id: "11",
    name: "Sui Move Developers",
    tokenSymbol: "SUI",
    tokenAmount: 800,
    tokenValue: 400,
    requirements: ["Move development", "Testnet participation"],
    endDate: "2025-06-15",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for developers building with Move on the Sui blockchain.",
    chainId: "sui",
    status: "active",
    eligibility: "Developers who deployed Move contracts on Sui testnet",
    totalAllocation: "25,000,000 SUI",
    website: "https://sui.io",
    difficulty: "medium",
  },
  {
    id: "12",
    name: "Aptos Early Adopters",
    tokenSymbol: "APT",
    tokenAmount: 150,
    tokenValue: 750,
    requirements: ["Testnet participation", "Community engagement"],
    endDate: "2025-05-30",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for early adopters and community members of Aptos blockchain.",
    chainId: "aptos",
    status: "active",
    eligibility: "Users who participated in Aptos testnet and community events",
    totalAllocation: "10,000,000 APT",
    website: "https://aptoslabs.com",
    difficulty: "easy",
  },
  {
    id: "13",
    name: "Solana DeFi Users",
    tokenSymbol: "SOL",
    tokenAmount: 2,
    tokenValue: 300,
    requirements: ["DeFi usage", "Liquidity provision"],
    endDate: "2025-06-05",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for active users of DeFi protocols on Solana.",
    chainId: "solana",
    status: "active",
    eligibility: "Users who provided liquidity or used DeFi on Solana",
    totalAllocation: "500,000 SOL",
    website: "https://solana.com",
    difficulty: "medium",
  },
  {
    id: "14",
    name: "Avalanche Subnet Builders",
    tokenSymbol: "AVAX",
    tokenAmount: 5,
    tokenValue: 400,
    requirements: ["Subnet deployment", "Validator running"],
    endDate: "2025-06-20",
    image: "/placeholder.svg?height=80&width=80",
    description: "Rewards for developers building and deploying Avalanche Subnets.",
    chainId: "avalanche",
    status: "active",
    eligibility: "Developers who deployed a Subnet on Avalanche",
    totalAllocation: "200,000 AVAX",
    website: "https://avax.network",
    difficulty: "hard",
  },

  // Incoming airdrops
  {
    id: "5",
    name: "Starknet Genesis",
    tokenSymbol: "STRK",
    tokenAmount: 1200,
    tokenValue: 480,
    requirements: ["StarkNet usage", "Early adoption"],
    startDate: "2025-06-15",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming airdrop for early Starknet users and developers.",
    chainId: "starknet",
    status: "incoming",
    eligibility: "Early Starknet users and developers",
    totalAllocation: "75,000,000 STRK",
    website: "https://starknet.io",
    difficulty: "medium",
    expectedLaunch: "June 2025",
  },
  {
    id: "6",
    name: "Scroll Protocol",
    tokenSymbol: "SCRL",
    tokenAmount: 800,
    tokenValue: 320,
    requirements: ["Testnet participation", "Community engagement"],
    startDate: "2025-07-01",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming token distribution for Scroll Protocol testnet participants.",
    chainId: "scroll",
    status: "incoming",
    eligibility: "Scroll testnet participants and community members",
    totalAllocation: "40,000,000 SCRL",
    website: "https://scroll.io",
    difficulty: "easy",
    expectedLaunch: "July 2025",
  },
  {
    id: "7",
    name: "Linea Network",
    tokenSymbol: "LINE",
    tokenAmount: 500,
    tokenValue: 250,
    requirements: ["Linea bridge usage", "DApp interaction"],
    startDate: "2025-06-20",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming airdrop for users of Linea Network and its ecosystem.",
    chainId: "linea",
    status: "incoming",
    eligibility: "Users who bridged to Linea and used at least 3 dApps",
    totalAllocation: "60,000,000 LINE",
    website: "https://linea.build",
    difficulty: "medium",
    expectedLaunch: "June 2025",
  },
  {
    id: "8",
    name: "Mantle Launch",
    tokenSymbol: "MNT",
    tokenAmount: 1500,
    tokenValue: 600,
    requirements: ["BitDAO governance", "Mantle testnet"],
    startDate: "2025-08-01",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming token distribution for Mantle Network early adopters.",
    chainId: "mantle",
    status: "incoming",
    eligibility: "BitDAO governance participants and Mantle testnet users",
    totalAllocation: "100,000,000 MNT",
    website: "https://mantle.xyz",
    difficulty: "hard",
    expectedLaunch: "August 2025",
  },
  {
    id: "15",
    name: "Fuel Network Genesis",
    tokenSymbol: "FUEL",
    tokenAmount: 2000,
    tokenValue: 400,
    requirements: ["Testnet participation", "Sway development"],
    startDate: "2025-07-15",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming airdrop for early Fuel Network users and Sway developers.",
    chainId: "fuel",
    status: "incoming",
    eligibility: "Developers who built with Sway on Fuel testnet",
    totalAllocation: "50,000,000 FUEL",
    website: "https://fuel.network",
    difficulty: "medium",
    expectedLaunch: "July 2025",
  },
  {
    id: "16",
    name: "Monad Blockchain",
    tokenSymbol: "MONAD",
    tokenAmount: 1000,
    tokenValue: 500,
    requirements: ["Testnet validation", "Community participation"],
    startDate: "2025-08-15",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming token distribution for Monad blockchain early adopters.",
    chainId: "monad",
    status: "incoming",
    eligibility: "Testnet validators and active community members",
    totalAllocation: "30,000,000 MONAD",
    website: "https://monad.xyz",
    difficulty: "hard",
    expectedLaunch: "August 2025",
  },
  {
    id: "17",
    name: "Eigenlayer Restakers",
    tokenSymbol: "EIGEN",
    tokenAmount: 500,
    tokenValue: 750,
    requirements: ["ETH restaking", "AVS participation"],
    startDate: "2025-07-10",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming airdrop for Ethereum restakers on Eigenlayer.",
    chainId: "ethereum",
    status: "incoming",
    eligibility: "Users who restaked ETH on Eigenlayer",
    totalAllocation: "25,000,000 EIGEN",
    website: "https://eigenlayer.xyz",
    difficulty: "medium",
    expectedLaunch: "July 2025",
  },
  {
    id: "18",
    name: "Taiko Rollup",
    tokenSymbol: "TAIKO",
    tokenAmount: 1200,
    tokenValue: 360,
    requirements: ["Testnet usage", "Bridge transactions"],
    startDate: "2025-06-25",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming token distribution for Taiko rollup early users.",
    chainId: "taiko",
    status: "incoming",
    eligibility: "Users who bridged assets to Taiko testnet",
    totalAllocation: "45,000,000 TAIKO",
    website: "https://taiko.xyz",
    difficulty: "easy",
    expectedLaunch: "June 2025",
  },
  {
    id: "19",
    name: "Mode Network",
    tokenSymbol: "MODE",
    tokenAmount: 800,
    tokenValue: 240,
    requirements: ["Sequencer participation", "Value sharing"],
    startDate: "2025-07-20",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming airdrop for Mode Network early adopters and participants.",
    chainId: "mode",
    status: "incoming",
    eligibility: "Users who participated in Mode's value sharing ecosystem",
    totalAllocation: "35,000,000 MODE",
    website: "https://mode.network",
    difficulty: "medium",
    expectedLaunch: "July 2025",
  },
  {
    id: "20",
    name: "Berachain Launch",
    tokenSymbol: "BERA",
    tokenAmount: 300,
    tokenValue: 900,
    requirements: ["Testnet activity", "Honey farming"],
    startDate: "2025-08-10",
    image: "/placeholder.svg?height=80&width=80",
    description: "Upcoming token distribution for Berachain early adopters.",
    chainId: "berachain",
    status: "incoming",
    eligibility: "Users who participated in honey farming on testnet",
    totalAllocation: "20,000,000 BERA",
    website: "https://berachain.com",
    difficulty: "hard",
    expectedLaunch: "August 2025",
  },
]

export function AirdropExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"value" | "date" | "amount">("value")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const activeAirdrops = mockAirdrops.filter((airdrop) => airdrop.status === "active")
  const incomingAirdrops = mockAirdrops.filter((airdrop) => airdrop.status === "incoming")

  const filterAirdrops = (airdrops: typeof mockAirdrops) => {
    return airdrops
      .filter((airdrop) => {
        const matchesSearch =
          airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          airdrop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          airdrop.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesChain = selectedChains.length === 0 || selectedChains.includes(airdrop.chainId)

        const matchesDifficulty = difficultyFilter.length === 0 || difficultyFilter.includes(airdrop.difficulty)

        return matchesSearch && matchesChain && matchesDifficulty
      })
      .sort((a, b) => {
        if (sortBy === "value") {
          return b.tokenValue - a.tokenValue
        } else if (sortBy === "amount") {
          return b.tokenAmount - a.tokenAmount
        } else {
          // Sort by date
          const dateA = a.status === "active" ? new Date(a.endDate) : new Date(a.startDate)
          const dateB = b.status === "active" ? new Date(b.endDate) : new Date(b.startDate)
          return dateA.getTime() - dateB.getTime()
        }
      })
  }

  const filteredActiveAirdrops = filterAirdrops(activeAirdrops)
  const filteredIncomingAirdrops = filterAirdrops(incomingAirdrops)

  // Calculate pagination for active and incoming airdrops
  const totalActivePages = Math.ceil(filteredActiveAirdrops.length / itemsPerPage)
  const totalIncomingPages = Math.ceil(filteredIncomingAirdrops.length / itemsPerPage)

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentActiveAirdrops = filteredActiveAirdrops.slice(startIndex, startIndex + itemsPerPage)
  const currentIncomingAirdrops = filteredIncomingAirdrops.slice(startIndex, startIndex + itemsPerPage)

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleChainsChange = (chains: string[]) => {
    setSelectedChains(chains)
    setCurrentPage(1)
  }

  const handleDifficultyChange = (difficulties: string[]) => {
    setDifficultyFilter(difficulties)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: "value" | "date" | "amount") => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const chains = Array.from(new Set(mockAirdrops.map((airdrop) => airdrop.chainId)))
  const difficulties = ["easy", "medium", "hard"]

  return (
    <div className="space-y-6">
      <AirdropFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        chains={chains}
        selectedChains={selectedChains}
        onChainsChange={handleChainsChange}
        difficulties={difficulties}
        selectedDifficulties={difficultyFilter}
        onDifficultiesChange={handleDifficultyChange}
        sortBy={sortBy}
        onSortByChange={handleSortChange}
      />

      <Tabs defaultValue="active" className="custom-tabs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Active Airdrops
            <Badge variant="secondary" className="ml-1">
              {filteredActiveAirdrops.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Incoming Airdrops
            <Badge variant="secondary" className="ml-1">
              {filteredIncomingAirdrops.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {filteredActiveAirdrops.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentActiveAirdrops.map((airdrop) => (
                  <AirdropCard key={airdrop.id} airdrop={airdrop} />
                ))}
              </div>

              {filteredActiveAirdrops.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalActivePages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredActiveAirdrops.length}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-medium">No active airdrops found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="incoming">
          {filteredIncomingAirdrops.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentIncomingAirdrops.map((airdrop) => (
                  <AirdropCard key={airdrop.id} airdrop={airdrop} />
                ))}
              </div>

              {filteredIncomingAirdrops.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalIncomingPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredIncomingAirdrops.length}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-medium">No incoming airdrops found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
