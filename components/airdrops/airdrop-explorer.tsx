"use client";

import { useState } from "react";
import { AirdropCard } from "./airdrop-card";
import { AirdropFilters } from "./airdrop-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Gift } from "lucide-react";
import { Pagination } from "@/components/dapps/pagination";

// Mock airdrop data
const mockAirdrops = [
   // Active airdrops
   {
      id: "1",
      name: "SoneFi",
      tokenSymbol: "SBT",
      tokenAmount: 0,
      tokenValue: 0,
      requirements: ["Bridge ETH to Soneium Network", "Start Earning Points"],
      startDate: "2025-01-16",
      image: "https://airdrops.io/wp-content/uploads/2024/11/SoneFi.jpg",
      description:
         "SoneFi is a Soneium-based DEX with leveraged trading, dual-tokenomics, and SBT rewards.",
      chainId: "soneium",
      status: "active",
      eligibility: "-",
      totalAllocation: "n/a",
      website: "https://sonefi.xyz/",
      difficulty: "easy",
   },
   {
      id: "2",
      name: "Sake Finance",
      tokenSymbol: "ETH",
      tokenAmount: 0,
      tokenValue: 0,
      requirements: [
         "Visit Sake Finance Rewards Program Page",
         "Join the Rewards Program: Sign the message with your wallet (first step)",
         "Follow @SakeFinance on Twitter and verify",
         "Join the Discord server and get the Sipper role",
         "Bridge assets to Soneium: Buy assets like ETH or USDC from Binance or use Rhino Bridge",
         "Supply assets to the protocol: Navigate to the Supply section, choose from available assets (ETH, WETH, ASTR, USDC.e), and deposit your assets as collateral",
         "Engage in borrowing: Use the Borrow tab to take loans, maintain a safe health factor above 1, and consider borrowing SONE for additional strategies",
      ],
      startDate: "-",
      image: "https://airdrops.io/wp-content/uploads/2025/01/Sake-Finance-Profile.jpg",
      description:
         "Sake Finance is a Soneium-based DeFi protocol offering a comprehensive rewards program guiding users through wallet connection, asset bridging, collateral supply, and strategic borrowing.",
      chainId: "soneium",
      status: "active",
      eligibility: "-",
      totalAllocation: "n/a",
      website: "https://www.sakefinance.com/",
      difficulty: "medium",
   },
   {
      id: "3",
      name: "UntitledBank",
      tokenSymbol: "U",
      tokenAmount: 0,
      tokenValue: 0,
      requirements: [
         "Deposit your assets into the lending pools",
         "Earn 1 U point per hour for every $100 worth of assets deposited",
         "Borrow assets against your collateral",
         "Earn 2 U points per hour for every $100 borrowed",
      ],
      startDate: "2025-03-10",
      image: "https://airdrops.io/wp-content/uploads/2025/01/UntitledBank.jpg",
      description:
         "UntitledBank offers comprehensive financial strategies including deposit, borrowing, and referral programs, while actively encouraging community engagement.",
      chainId: "soneium",
      status: "active",
      eligibility: "-",
      totalAllocation: "n/a",
      website: "https://untitledbank.co/",
      difficulty: "hard",
   },

   {
      id: "4",
      name: "Sonus",
      tokenSymbol: "SONUS",
      tokenAmount: 0,
      tokenValue: 0,
      requirements: [
         "Provide Liquidity",
         "Stake Your LP Positions",
         "Monitor Your Points",
         "Maintain Your Position",
      ],
      startDate: "2025-03-10",
      image: "https://airdrops.io/wp-content/uploads/2025/02/8jE7p-5Y_400x400.png",
      description:
         "Sonus Exchange is Soneium's AMM hub, blending Uniswap v3 and Solidly features with ve(3,3) tokenomics for optimized liquidity and trading.",
      chainId: "soneium",
      status: "active",
      eligibility: "-",
      totalAllocation: "200,000,000",
      website: "https://sonus.exchange/",
      difficulty: "medium",
   },
   {
      id: "5",
      name: "Sleepagotchi",
      tokenSymbol: "ETH",
      tokenAmount: 0,
      tokenValue: 0,
      requirements: [
         "Download the Telegram Mini-App",
         "Pre-Register on the Official Website",
         "Claim Daily Rewards in the Mini-App",
         "Upgrade Your Character",
      ],
      startDate: "2025-02-20",
      image: "https://airdrops.io/wp-content/uploads/2025/03/Sleepagotchi.jpg",
      description:
         "Sleepagotchi is a sleep-to-earn app rewarding users with crypto/NFTs for healthy sleep habits.",
      chainId: "soneium",
      status: "active",
      eligibility: "-",
      totalAllocation: "n/a",
      website: "https://www.sleepagotchi.com/",
      difficulty: "easy",
   },
];

export function AirdropExplorer() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedChains, setSelectedChains] = useState<string[]>([]);
   const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
   const [sortBy, setSortBy] = useState<"value" | "date" | "amount">("value");
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 9;

   const activeAirdrops = mockAirdrops.filter(
      (airdrop) => airdrop.status === "active"
   );
   const incomingAirdrops = mockAirdrops.filter(
      (airdrop) => airdrop.status === "incoming"
   );

   const filterAirdrops = (airdrops: typeof mockAirdrops) => {
      return airdrops
         .filter((airdrop) => {
            const matchesSearch =
               airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               airdrop.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
               airdrop.tokenSymbol
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());

            const matchesChain =
               selectedChains.length === 0 ||
               selectedChains.includes(airdrop.chainId);

            const matchesDifficulty =
               difficultyFilter.length === 0 ||
               difficultyFilter.includes(airdrop.difficulty);

            return matchesSearch && matchesChain && matchesDifficulty;
         })
         .sort((a, b) => {
            if (sortBy === "value") {
               return b.tokenValue - a.tokenValue;
            } else if (sortBy === "amount") {
               return b.tokenAmount - a.tokenAmount;
            } else {
               // Sort by date
               const dateA = new Date(a.startDate);
               const dateB = new Date(b.startDate);
               return dateA.getTime() - dateB.getTime();
            }
         });
   };

   const filteredActiveAirdrops = filterAirdrops(activeAirdrops);
   const filteredIncomingAirdrops = filterAirdrops(incomingAirdrops);

   // Calculate pagination for active and incoming airdrops
   const totalActivePages = Math.ceil(
      filteredActiveAirdrops.length / itemsPerPage
   );
   const totalIncomingPages = Math.ceil(
      filteredIncomingAirdrops.length / itemsPerPage
   );

   // Get current page items
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentActiveAirdrops = filteredActiveAirdrops.slice(
      startIndex,
      startIndex + itemsPerPage
   );
   const currentIncomingAirdrops = filteredIncomingAirdrops.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   const handleSearchChange = (query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
   };

   const handleChainsChange = (chains: string[]) => {
      setSelectedChains(chains);
      setCurrentPage(1);
   };

   const handleDifficultyChange = (difficulties: string[]) => {
      setDifficultyFilter(difficulties);
      setCurrentPage(1);
   };

   const handleSortChange = (sort: "value" | "date" | "amount") => {
      setSortBy(sort);
      setCurrentPage(1);
   };

   const chains = Array.from(
      new Set(mockAirdrops.map((airdrop) => airdrop.chainId))
   );
   const difficulties = ["easy", "medium", "hard"];

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
               <TabsTrigger
                  value="incoming"
                  className="flex items-center gap-2"
               >
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
                        <p className="text-lg font-medium">
                           No active airdrops found
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Try adjusting your search or filters
                        </p>
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
                        <p className="text-lg font-medium">
                           No incoming airdrops found
                        </p>
                        <p className="text-sm text-muted-foreground">
                           Try adjusting your search or filters
                        </p>
                     </div>
                  </div>
               )}
            </TabsContent>
         </Tabs>
      </div>
   );
}
