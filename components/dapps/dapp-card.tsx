"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLink } from "lucide-react"
import { RatingStar } from "./rating-star"

interface Dapp {
  id: string
  name: string
  description: string
  logo: string
  category: string
  chain: string
  rating: number
  url: string
  isBookmarked: boolean
}

interface DappCardProps {
  dapp: Dapp
  onToggleBookmark: () => void
  onRatingChange: (rating: number) => void
}

export function DappCard({ dapp, onToggleBookmark, onRatingChange }: DappCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src={dapp.logo || "/placeholder.svg"} alt={`${dapp.name} logo`} className="h-10 w-10 rounded-md" />
            <div>
              <CardTitle className="text-lg">{dapp.name}</CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {dapp.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {dapp.chain}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={dapp.isBookmarked ? "text-primary" : "text-muted-foreground"}
            onClick={onToggleBookmark}
          >
            <BookmarkIcon className="h-4 w-4" />
            <span className="sr-only">{dapp.isBookmarked ? "Remove bookmark" : "Add bookmark"}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription className="line-clamp-2 h-10">{dapp.description}</CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStar key={star} filled={star <= Math.round(dapp.rating)} onClick={() => onRatingChange(star)} />
            ))}
            <span className="ml-2 text-sm font-medium">{dapp.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <a href={dapp.url} target="_blank" rel="noopener noreferrer">
            Open Dapp
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
