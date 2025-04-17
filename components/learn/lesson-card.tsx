"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Star } from "lucide-react"

interface LessonCardProps {
  id: string
  title: string
  description: string
  xpReward: number
  status: "available" | "in-progress" | "completed" | "locked"
  category: string
  duration: string
  onStart: () => void
}

export function LessonCard({ id, title, description, xpReward, status, category, duration, onStart }: LessonCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Available
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Completed
          </Badge>
        )
      case "locked":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
            Locked
          </Badge>
        )
    }
  }

  const getButtonText = () => {
    switch (status) {
      case "available":
        return "Start Lesson"
      case "in-progress":
        return "Continue"
      case "completed":
        return "Review"
      case "locked":
        return "Locked"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline">{category}</Badge>
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            <span className="font-medium">{xpReward} XP</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          className="w-full gap-2"
          onClick={onStart}
          disabled={status === "locked"}
          variant={status === "completed" ? "outline" : "default"}
        >
          <BookOpen className="h-4 w-4" />
          {getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  )
}
