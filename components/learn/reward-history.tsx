"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Coins, TrendingUp, Trophy } from "lucide-react"

interface HistoryItem {
  id: string
  type: "lesson_completed" | "token_claimed" | "level_up" | "mission_completed"
  title?: string
  xpEarned?: number
  xpConverted?: number
  amount?: number
  newLevel?: number
  date: string
}

interface RewardHistoryProps {
  history: HistoryItem[]
}

export function RewardHistory({ history }: RewardHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case "lesson_completed":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "token_claimed":
        return <Coins className="h-5 w-5 text-primary" />
      case "level_up":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "mission_completed":
        return <Trophy className="h-5 w-5 text-purple-500" />
      default:
        return null
    }
  }

  const getHistoryBadge = (type: string) => {
    switch (type) {
      case "lesson_completed":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Lesson
          </Badge>
        )
      case "token_claimed":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Tokens
          </Badge>
        )
      case "level_up":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Level Up
          </Badge>
        )
      case "mission_completed":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            Mission
          </Badge>
        )
      default:
        return null
    }
  }

  const getHistoryTitle = (item: HistoryItem) => {
    switch (item.type) {
      case "lesson_completed":
        return `Completed "${item.title}"`
      case "token_claimed":
        return `Claimed ${item.amount} tokens`
      case "level_up":
        return `Reached Level ${item.newLevel}`
      case "mission_completed":
        return `Completed mission "${item.title}"`
      default:
        return ""
    }
  }

  const getHistoryDetails = (item: HistoryItem) => {
    switch (item.type) {
      case "lesson_completed":
        return `Earned ${item.xpEarned} XP`
      case "token_claimed":
        return `Converted ${item.xpConverted} XP`
      case "level_up":
        return `Achievement unlocked`
      case "mission_completed":
        return `Earned ${item.xpEarned} XP`
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward History</CardTitle>
        <CardDescription>Track your learning progress and rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {getHistoryIcon(item.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{getHistoryTitle(item)}</h3>
                      {getHistoryBadge(item.type)}
                    </div>
                    <p className="text-sm text-muted-foreground">{getHistoryDetails(item)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                </div>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-medium">No history yet</p>
                <p className="text-sm text-muted-foreground">Complete lessons to earn rewards</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
