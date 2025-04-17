"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface ToolCardProps {
  icon: ReactNode
  name: string
  description: string
  onClick: () => void
}

export function ToolCard({ icon, name, description, onClick }: ToolCardProps) {
  return (
    <Card className="transition-all hover:shadow-md hover:border-primary/50 cursor-pointer tool-card" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
