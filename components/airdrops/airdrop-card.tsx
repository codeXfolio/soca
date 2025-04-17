"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ExternalLink, Gift, Info } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Airdrop {
  id: string
  name: string
  tokenSymbol: string
  tokenAmount: number
  tokenValue: number
  requirements: string[]
  endDate?: string
  startDate?: string
  image: string
  description: string
  chainId: string
  status: "active" | "incoming"
  eligibility: string
  totalAllocation: string
  website: string
  difficulty: string
  expectedLaunch?: string
}

interface AirdropCardProps {
  airdrop: Airdrop
}

export function AirdropCard({ airdrop }: AirdropCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return ""
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${airdrop.status === "incoming" ? "border-dashed" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={airdrop.image || "/placeholder.svg"}
              alt={airdrop.name}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <CardTitle className="text-lg">{airdrop.name}</CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {airdrop.chainId}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(airdrop.difficulty)}>
                  {airdrop.difficulty.charAt(0).toUpperCase() + airdrop.difficulty.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="line-clamp-2 h-10">{airdrop.description}</CardDescription>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            {airdrop.status === "active" ? (
              <>
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Ends: {formatDate(airdrop.endDate!)}</span>
              </>
            ) : (
              <>
                <Clock className="h-3.5 w-3.5" />
                <span>Expected: {airdrop.expectedLaunch}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {airdrop.tokenAmount} {airdrop.tokenSymbol}
            </Badge>
            <span className="font-medium">${airdrop.tokenValue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
                <span className="sr-only">Airdrop details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View airdrop details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant={airdrop.status === "active" ? "default" : "outline"}>
              {airdrop.status === "active" ? (
                <>
                  <Gift className="mr-2 h-4 w-4" />
                  Check Eligibility
                </>
              ) : (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  Set Reminder
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Image
                  src={airdrop.image || "/placeholder.svg"}
                  alt={airdrop.name}
                  width={24}
                  height={24}
                  className="rounded-md"
                />
                {airdrop.name}
              </DialogTitle>
              <DialogDescription>{airdrop.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Token</p>
                  <p className="font-medium">
                    {airdrop.tokenAmount} {airdrop.tokenSymbol}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Value</p>
                  <p className="font-medium">${airdrop.tokenValue}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Allocation</p>
                  <p className="font-medium">{airdrop.totalAllocation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blockchain</p>
                  <p className="font-medium capitalize">{airdrop.chainId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Eligibility</p>
                <p>{airdrop.eligibility}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Requirements</p>
                <ul className="list-disc pl-5 space-y-1">
                  {airdrop.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" asChild>
                  <a
                    href={airdrop.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>

                {airdrop.status === "active" ? <Button>Check Eligibility</Button> : <Button>Set Reminder</Button>}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
