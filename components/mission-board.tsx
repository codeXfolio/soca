"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Star, Trophy } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  xpReward: number
  deadline: string
  progress?: number
  total?: number
  status: "available" | "in-progress" | "completed" | "expired"
}

interface MissionBoardProps {
  missions: Mission[]
}

export function MissionBoard({ missions }: MissionBoardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getStatusBadge = (status: string) => {
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
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Expired
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 mission-board">
      <Card>
        <CardHeader>
          <CardTitle>Active Missions</CardTitle>
          <CardDescription>Complete special missions to earn bonus XP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {missions.map((mission) => (
            <Card key={mission.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{mission.title}</h3>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                      <div>{getStatusBadge(mission.status)}</div>
                    </div>

                    {mission.progress !== undefined && mission.total !== undefined && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>
                            {mission.progress} / {mission.total}
                          </span>
                        </div>
                        <Progress value={(mission.progress / mission.total) * 100} className="h-1.5" />
                      </div>
                    )}

                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>Deadline: {formatDate(mission.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500" />
                        <span className="font-medium">{mission.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant={mission.status === "completed" ? "outline" : "default"}
                      size="sm"
                      disabled={mission.status === "expired"}
                      className="gap-1"
                    >
                      <Trophy className="h-4 w-4" />
                      {mission.status === "completed" ? "Completed" : "View Details"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {missions.length === 0 && (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-lg font-medium">No active missions</p>
                <p className="text-sm text-muted-foreground">Check back later for new missions</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
