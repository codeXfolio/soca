"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarProps {
  filled: boolean
  onClick: () => void
}

export function RatingStar({ filled, onClick }: RatingStarProps) {
  return (
    <button type="button" className="focus:outline-none" onClick={onClick}>
      <Star className={cn("h-4 w-4", filled ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground")} />
      <span className="sr-only">{filled ? "Filled star" : "Empty star"}</span>
    </button>
  )
}
