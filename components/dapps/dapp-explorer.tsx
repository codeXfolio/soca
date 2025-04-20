"use client";

import { useState } from "react";
import { DappSearchBar } from "./dapp-search-bar";
import { DappCard } from "./dapp-card";
import { FilterBar } from "./filter-bar";
import { Pagination } from "./pagination";

// Update the Dapp interface to use categories array instead of a single category
interface Dapp {
   id: string;
   name: string;
   description: string;
   logo: string;
   categories: string[]; // Changed from category: string to categories: string[]
   chain: string;
   rating: number;
   url: string;
   isBookmarked: boolean;
   website?: string;
   twitter?: string;
   discord?: string;
   github?: string;
}

export function DappExplorer() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [sortBy, setSortBy] = useState<"popular" | "newest" | "rating">(
      "popular"
   );
   // Add pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 12;

   // Update the mock data to use categories arrays
   const dapps: Dapp[] = [
      {
         id: "1",
         name: "Uniswap",
         description:
            "Swap, earn, and build on the leading decentralized crypto trading protocol.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["DeFi", "DEX", "AMM"],
         chain: "Ethereum",
         rating: 4.8,
         url: "https://app.uniswap.org",
         isBookmarked: true,
         website: "https://uniswap.org",
         twitter: "https://twitter.com/Uniswap",
         discord: "https://discord.com/invite/FCfyBSbCU5",
         github: "https://github.com/Uniswap",
      },
      {
         id: "2",
         name: "OpenSea",
         description: "The world's first and largest NFT marketplace.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["NFT", "Marketplace"],
         chain: "Ethereum",
         rating: 4.5,
         url: "https://opensea.io",
         isBookmarked: false,
         website: "https://opensea.io",
         twitter: "https://twitter.com/opensea",
         discord: "https://discord.com/invite/opensea",
         github: "https://github.com/ProjectOpenSea",
      },
      {
         id: "3",
         name: "Aave",
         description:
            "Open source liquidity protocol for earning interest and borrowing assets.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["DeFi", "Lending", "Borrowing"],
         chain: "Ethereum",
         rating: 4.7,
         url: "https://app.aave.com",
         isBookmarked: false,
         website: "https://aave.com",
         twitter: "https://twitter.com/aave",
         discord: "https://discord.com/invite/aave",
         github: "https://github.com/aave",
      },
      {
         id: "4",
         name: "Lens Protocol",
         description: "A composable and decentralized social graph.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["Social", "Infrastructure"],
         chain: "Polygon",
         rating: 4.3,
         url: "https://lens.xyz",
         isBookmarked: true,
         website: "https://lens.xyz",
         twitter: "https://twitter.com/LensProtocol",
         discord: "https://discord.com/invite/lensprotocol",
         github: "https://github.com/lens-protocol",
      },
      {
         id: "5",
         name: "Arbitrum Bridge",
         description: "Bridge assets to Arbitrum's Layer 2 scaling solution.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["Bridge", "Layer 2"],
         chain: "Arbitrum",
         rating: 4.2,
         url: "https://bridge.arbitrum.io",
         isBookmarked: false,
         website: "https://arbitrum.io",
         twitter: "https://twitter.com/arbitrum",
         discord: "https://discord.com/invite/arbitrum",
         github: "https://github.com/OffchainLabs/arbitrum",
      },
      {
         id: "6",
         name: "dYdX",
         description: "Decentralized exchange for perpetual contracts.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["DeFi", "DEX", "Derivatives"],
         chain: "Ethereum",
         rating: 4.6,
         url: "https://dydx.exchange",
         isBookmarked: false,
         website: "https://dydx.exchange",
         twitter: "https://twitter.com/dYdX",
         discord: "https://discord.com/invite/dydx",
         github: "https://github.com/dydxprotocol",
      },
      {
         id: "7",
         name: "Blur",
         description: "NFT marketplace built for pro traders.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["NFT", "Marketplace"],
         chain: "Ethereum",
         rating: 4.4,
         url: "https://blur.io",
         isBookmarked: false,
         website: "https://blur.io",
         twitter: "https://twitter.com/blur_io",
         discord: "https://discord.com/invite/blur-io",
      },
      {
         id: "8",
         name: "Optimism Bridge",
         description: "Bridge assets to Optimism's Layer 2 scaling solution.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["Bridge", "Layer 2"],
         chain: "Optimism",
         rating: 4.1,
         url: "https://app.optimism.io/bridge",
         isBookmarked: false,
         website: "https://optimism.io",
         twitter: "https://twitter.com/optimismFND",
         discord: "https://discord.com/invite/optimism",
         github: "https://github.com/ethereum-optimism",
      },
      // Add more mock dapps to demonstrate pagination
      {
         id: "9",
         name: "Compound",
         description:
            "Algorithmic, autonomous interest rate protocol for borrowing and lending.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["DeFi", "Lending"],
         chain: "Ethereum",
         rating: 4.5,
         url: "https://app.compound.finance",
         isBookmarked: false,
         website: "https://compound.finance",
         twitter: "https://twitter.com/compoundfinance",
         discord: "https://discord.com/invite/compound",
         github: "https://github.com/compound-finance",
      },
      {
         id: "10",
         name: "Zora",
         description:
            "Decentralized marketplace protocol for NFTs and digital media.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["NFT", "Marketplace", "Media"],
         chain: "Ethereum",
         rating: 4.2,
         url: "https://zora.co",
         isBookmarked: false,
         website: "https://zora.co",
         twitter: "https://twitter.com/ourZORA",
         discord: "https://discord.com/invite/zora",
         github: "https://github.com/ourzora",
      },
      {
         id: "11",
         name: "Curve Finance",
         description:
            "Exchange liquidity pool designed for stablecoin trading.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["DeFi", "DEX", "Stablecoins"],
         chain: "Ethereum",
         rating: 4.7,
         url: "https://curve.fi",
         isBookmarked: false,
         website: "https://curve.fi",
         twitter: "https://twitter.com/CurveFinance",
         discord: "https://discord.com/invite/rgrfS7W",
         github: "https://github.com/curvefi",
      },
      {
         id: "12",
         name: "Foundation",
         description:
            "Platform for artists and collectors to create and trade NFTs.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["NFT", "Marketplace", "Art"],
         chain: "Ethereum",
         rating: 4.3,
         url: "https://foundation.app",
         isBookmarked: false,
         website: "https://foundation.app",
         twitter: "https://twitter.com/foundation",
         discord: "https://discord.com/invite/foundation",
      },
      {
         id: "13",
         name: "Hop Protocol",
         description: "A scalable rollup-to-rollup general token bridge.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["Bridge", "Infrastructure", "Cross-chain"],
         chain: "Ethereum",
         rating: 4.0,
         url: "https://hop.exchange",
         isBookmarked: false,
         website: "https://hop.exchange",
         twitter: "https://twitter.com/HopProtocol",
         discord: "https://discord.com/invite/PwCF88emV4",
         github: "https://github.com/hop-protocol",
      },
      {
         id: "14",
         name: "Balancer",
         description: "Automated portfolio manager and trading platform.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["DeFi", "DEX", "AMM"],
         chain: "Ethereum",
         rating: 4.4,
         url: "https://app.balancer.fi",
         isBookmarked: false,
         website: "https://balancer.fi",
         twitter: "https://twitter.com/BalancerLabs",
         discord: "https://discord.com/invite/balancer",
         github: "https://github.com/balancer-labs",
      },
      {
         id: "15",
         name: "Farcaster",
         description: "Sufficiently decentralized social network.",
         logo: "/placeholder.svg?height=60&width=60",
         categories: ["Social", "Communication", "Content"],
         chain: "Ethereum",
         rating: 4.2,
         url: "https://farcaster.xyz",
         isBookmarked: false,
         website: "https://farcaster.xyz",
         twitter: "https://twitter.com/farcaster",
         discord: "https://discord.com/invite/farcaster",
         github: "https://github.com/farcasterxyz",
      },
   ];

   const handleToggleBookmark = (dappId: string) => {
      // In a real app, this would update state or call an API
      console.log(`Toggle bookmark for dapp ${dappId}`);
   };

   const handleRatingChange = (dappId: string, rating: number) => {
      // In a real app, this would update state or call an API
      console.log(`Update rating for dapp ${dappId} to ${rating}`);
   };

   // Update the filter logic to handle multiple categories
   const filteredDapps = dapps.filter((dapp) => {
      const matchesSearch =
         dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         dapp.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
         selectedCategories.length === 0 ||
         dapp.categories.some((category) =>
            selectedCategories.includes(category)
         );

      return matchesSearch && matchesCategory;
   });

   // Sort dapps based on sortBy
   const sortedDapps = [...filteredDapps].sort((a, b) => {
      if (sortBy === "rating") {
         return b.rating - a.rating;
      } else if (sortBy === "newest") {
         // In a real app, this would sort by date
         return Number.parseInt(b.id) - Number.parseInt(a.id);
      } else {
         // Default: popular
         return b.rating - a.rating;
      }
   });

   // Calculate pagination
   const totalPages = Math.ceil(sortedDapps.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentDapps = sortedDapps.slice(startIndex, endIndex);

   // Reset to first page when filters change
   const handleFiltersChange = (categories: string[]) => {
      setSelectedCategories(categories);
      setCurrentPage(1);
   };

   const handleSearchChange = (query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
   };

   const handleSortChange = (sort: "popular" | "newest" | "rating") => {
      setSortBy(sort);
      setCurrentPage(1);
   };

   return (
      <div className="space-y-6">
         <DappSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
         />

         <FilterBar
            categories={["DeFi", "NFT", "Social", "Bridge"]}
            selectedCategories={selectedCategories}
            sortBy={sortBy}
            onCategoriesChange={handleFiltersChange}
            onSortByChange={handleSortChange}
         />

         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentDapps.map((dapp) => (
               <DappCard
                  key={dapp.id}
                  dapp={dapp}
                  onToggleBookmark={() => handleToggleBookmark(dapp.id)}
                  onRatingChange={(rating) =>
                     handleRatingChange(dapp.id, rating)
                  }
               />
            ))}
         </div>

         {sortedDapps.length === 0 && (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
               <div className="text-center">
                  <p className="text-lg font-medium">No dapps found</p>
                  <p className="text-sm text-muted-foreground">
                     Try adjusting your search or filters
                  </p>
               </div>
            </div>
         )}

         {sortedDapps.length > 0 && (
            <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={setCurrentPage}
               totalItems={sortedDapps.length}
               itemsPerPage={itemsPerPage}
            />
         )}
      </div>
   );
}
