"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface AirdropFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  chains: string[]
  selectedChains: string[]
  onChainsChange: (chains: string[]) => void
  difficulties: string[]
  selectedDifficulties: string[]
  onDifficultiesChange: (difficulties: string[]) => void
  sortBy: "value" | "date" | "amount"
  onSortByChange: (sortBy: "value" | "date" | "amount") => void
}

export function AirdropFilters({
  searchQuery,
  onSearchChange,
  chains,
  selectedChains,
  onChainsChange,
  difficulties,
  selectedDifficulties,
  onDifficultiesChange,
  sortBy,
  onSortByChange,
}: AirdropFiltersProps) {
  const clearFilters = () => {
    onChainsChange([])
    onDifficultiesChange([])
  }

  const hasActiveFilters = selectedChains.length > 0 || selectedDifficulties.length > 0

  return (
    <div className="space-y-4 airdrop-filters">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search airdrops by name, token, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  {selectedChains.length + selectedDifficulties.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => onSortByChange(value as any)}>
              <DropdownMenuRadioItem value="value">Highest Value</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date">Earliest Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="amount">Token Amount</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Blockchain</DropdownMenuLabel>
            {chains.map((chain) => (
              <DropdownMenuCheckboxItem
                key={chain}
                checked={selectedChains.includes(chain)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChainsChange([...selectedChains, chain])
                  } else {
                    onChainsChange(selectedChains.filter((c) => c !== chain))
                  }
                }}
              >
                {chain.charAt(0).toUpperCase() + chain.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
            {difficulties.map((difficulty) => (
              <DropdownMenuCheckboxItem
                key={difficulty}
                checked={selectedDifficulties.includes(difficulty)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onDifficultiesChange([...selectedDifficulties, difficulty])
                  } else {
                    onDifficultiesChange(selectedDifficulties.filter((d) => d !== difficulty))
                  }
                }}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedChains.map((chain) => (
            <Badge key={chain} variant="secondary" className="capitalize">
              {chain}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => onChainsChange(selectedChains.filter((c) => c !== chain))}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {chain} filter</span>
              </Button>
            </Badge>
          ))}
          {selectedDifficulties.map((difficulty) => (
            <Badge key={difficulty} variant="secondary" className="capitalize">
              {difficulty}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => onDifficultiesChange(selectedDifficulties.filter((d) => d !== difficulty))}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {difficulty} filter</span>
              </Button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-7" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
