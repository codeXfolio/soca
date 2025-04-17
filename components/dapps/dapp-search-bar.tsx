"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DappSearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function DappSearchBar({ searchQuery, onSearchChange }: DappSearchBarProps) {
  return (
    <div className="relative dapp-search-bar">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search dapps by name or description..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
