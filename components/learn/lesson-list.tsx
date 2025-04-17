"use client"

import { useState } from "react"
import { LessonCard } from "./lesson-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Lesson {
  id: string
  title: string
  description: string
  xpReward: number
  status: "available" | "in-progress" | "completed" | "locked"
  category: string
  duration: string
  content: any[]
}

interface LessonListProps {
  lessons: Lesson[]
  onStartLesson: (lessonId: string) => void
}

export function LessonList({ lessons, onStartLesson }: LessonListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const categories = Array.from(new Set(lessons.map((lesson) => lesson.category)))
  const statuses = ["available", "in-progress", "completed", "locked"]

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(lesson.category)
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(lesson.status)

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6 lesson-list">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter lessons</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2">
              <p className="font-medium mb-2">Categories</p>
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories((prev) => [...prev, category])
                    } else {
                      setSelectedCategories((prev) => prev.filter((c) => c !== category))
                    }
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
            <div className="p-2 border-t">
              <p className="font-medium mb-2">Status</p>
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStatuses((prev) => [...prev, status])
                    } else {
                      setSelectedStatuses((prev) => prev.filter((s) => s !== status))
                    }
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            description={lesson.description}
            xpReward={lesson.xpReward}
            status={lesson.status}
            category={lesson.category}
            duration={lesson.duration}
            onStart={() => onStartLesson(lesson.id)}
          />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-lg font-medium">No lessons found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  )
}
