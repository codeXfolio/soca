"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProgressCard } from "./user-progress-card"
import { LessonList } from "./lesson-list"
import { MissionBoard } from "./mission-board"
import { XPToTokenConverter } from "./xp-to-token-converter"
import { RewardHistory } from "./reward-history"
import { LessonPlayer } from "./lesson-player"
import { BookOpen, History, Coins, Trophy } from "lucide-react"

// Mock data for lessons
const lessons = [
  {
    id: "1",
    title: "Introduction to Blockchain",
    description: "Learn the fundamentals of blockchain technology and how it works.",
    xpReward: 100,
    status: "completed",
    category: "Fundamentals",
    duration: "15 min",
    content: [
      {
        type: "text",
        content:
          "Blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping without the need for a central authority.",
      },
      {
        type: "image",
        url: "/placeholder.svg?height=200&width=400",
        alt: "Blockchain Structure",
      },
      {
        type: "text",
        content:
          "Key features of blockchain include decentralization, transparency, immutability, and security through cryptography.",
      },
      {
        type: "quiz",
        question: "What is the main advantage of blockchain technology?",
        options: [
          "Centralized control",
          "Immutable record-keeping",
          "Slow transaction processing",
          "High energy consumption",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Understanding Smart Contracts",
    description: "Explore how smart contracts automate agreements on the blockchain.",
    xpReward: 150,
    status: "in-progress",
    category: "Development",
    duration: "20 min",
    content: [
      {
        type: "text",
        content:
          "Smart contracts are self-executing contracts with the terms directly written into code. They automatically execute when predefined conditions are met.",
      },
      {
        type: "text",
        content:
          "Smart contracts enable trustless transactions without intermediaries, reducing costs and increasing efficiency.",
      },
      {
        type: "quiz",
        question: "What language is commonly used to write smart contracts on Ethereum?",
        options: ["JavaScript", "Python", "Solidity", "C++"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "3",
    title: "DeFi Fundamentals",
    description: "Learn about decentralized finance and its applications.",
    xpReward: 200,
    status: "locked",
    category: "Finance",
    duration: "25 min",
    content: [
      {
        type: "text",
        content:
          "Decentralized Finance (DeFi) refers to financial services built on blockchain technology that operate without traditional financial intermediaries.",
      },
      {
        type: "text",
        content:
          "DeFi applications include lending, borrowing, trading, and yield farming, all operating in a permissionless and transparent manner.",
      },
      {
        type: "quiz",
        question: "Which of the following is NOT a common DeFi application?",
        options: ["Decentralized exchanges", "Lending protocols", "Yield farming", "Centralized custody"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "4",
    title: "NFTs Explained",
    description: "Understand non-fungible tokens and their use cases.",
    xpReward: 175,
    status: "available",
    category: "Digital Assets",
    duration: "18 min",
    content: [
      {
        type: "text",
        content:
          "Non-Fungible Tokens (NFTs) are unique digital assets that represent ownership of a specific item or piece of content on the blockchain.",
      },
      {
        type: "text",
        content:
          "Unlike cryptocurrencies, NFTs cannot be exchanged on a one-to-one basis as each token has unique properties and values.",
      },
      {
        type: "quiz",
        question: "What standard is commonly used for NFTs on Ethereum?",
        options: ["ERC-20", "ERC-721", "ERC-1155", "ERC-777"],
        correctAnswer: 1,
      },
    ],
  },
]

// Mock data for missions
const missions = [
  {
    id: "1",
    title: "Complete 3 Lessons",
    description: "Finish any three lessons from the curriculum",
    xpReward: 250,
    deadline: "2025-05-15",
    progress: 1,
    total: 3,
    status: "in-progress",
  },
  {
    id: "2",
    title: "Blockchain Quiz Master",
    description: "Score 100% on the blockchain fundamentals quiz",
    xpReward: 300,
    deadline: "2025-05-20",
    status: "available",
  },
  {
    id: "3",
    title: "DeFi Explorer",
    description: "Complete all DeFi-related lessons",
    xpReward: 400,
    deadline: "2025-06-01",
    progress: 0,
    total: 2,
    status: "available",
  },
]

// Mock data for reward history
const rewardHistory = [
  {
    id: "1",
    type: "lesson_completed",
    title: "Introduction to Blockchain",
    xpEarned: 100,
    date: "2025-04-10",
  },
  {
    id: "2",
    type: "token_claimed",
    amount: 50,
    xpConverted: 500,
    date: "2025-04-12",
  },
  {
    id: "3",
    type: "level_up",
    newLevel: 2,
    date: "2025-04-12",
  },
  {
    id: "4",
    type: "mission_completed",
    title: "First Steps",
    xpEarned: 150,
    date: "2025-04-15",
  },
]

export function LearnToEarnLayout() {
  const [userProgress, setUserProgress] = useState({
    xp: 650,
    level: 2,
    nextLevelXp: 1000,
    claimableTokens: 65,
  })

  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const [activeLessonData, setActiveLessonData] = useState<any | null>(null)

  const handleStartLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId)
    if (lesson) {
      setActiveLessonData(lesson)
      setActiveLesson(lessonId)
    }
  }

  const handleCloseLesson = () => {
    setActiveLesson(null)
    setActiveLessonData(null)
  }

  const handleCompleteLesson = (lessonId: string) => {
    // Update lesson status
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return { ...lesson, status: "completed" }
      }
      return lesson
    })

    // Update user progress
    const completedLesson = lessons.find((l) => l.id === lessonId)
    if (completedLesson) {
      setUserProgress((prev) => ({
        ...prev,
        xp: prev.xp + completedLesson.xpReward,
        claimableTokens: prev.claimableTokens + Math.floor(completedLesson.xpReward / 10),
      }))
    }

    handleCloseLesson()
  }

  const handleClaimTokens = (amount: number) => {
    setUserProgress((prev) => ({
      ...prev,
      claimableTokens: prev.claimableTokens - amount,
    }))
  }

  return (
    <div className="space-y-6">
      <UserProgressCard
        xp={userProgress.xp}
        level={userProgress.level}
        nextLevelXp={userProgress.nextLevelXp}
        claimableTokens={userProgress.claimableTokens}
        onClaimTokens={handleClaimTokens}
      />

      <Tabs defaultValue="lessons" className="custom-tabs">
        <TabsList className="w-full">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="missions" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Missions
          </TabsTrigger>
          <TabsTrigger value="convert" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Convert XP
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <LessonList lessons={lessons} onStartLesson={handleStartLesson} />
        </TabsContent>

        <TabsContent value="missions">
          <MissionBoard missions={missions} />
        </TabsContent>

        <TabsContent value="convert">
          <div className="mx-auto max-w-md">
            <XPToTokenConverter
              availableXp={userProgress.xp}
              conversionRate={10} // 10 XP = 1 token
              onConvert={(xp, tokens) => {
                setUserProgress((prev) => ({
                  ...prev,
                  xp: prev.xp - xp,
                  claimableTokens: prev.claimableTokens + tokens,
                }))
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <RewardHistory history={rewardHistory} />
        </TabsContent>
      </Tabs>

      {activeLesson && activeLessonData && (
        <LessonPlayer
          lesson={activeLessonData}
          onClose={handleCloseLesson}
          onComplete={() => handleCompleteLesson(activeLesson)}
        />
      )}
    </div>
  )
}
