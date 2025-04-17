"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, X } from "lucide-react"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface LessonContent {
  type: string
  content?: string
  url?: string
  alt?: string
  question?: string
  options?: string[]
  correctAnswer?: number
}

interface Lesson {
  id: string
  title: string
  description: string
  xpReward: number
  status: string
  category: string
  duration: string
  content: LessonContent[]
}

interface LessonPlayerProps {
  lesson: Lesson
  onClose: () => void
  onComplete: () => void
}

export function LessonPlayer({ lesson, onClose, onComplete }: LessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const totalSteps = lesson.content.length
  const progress = Math.round((completedSteps.length / totalSteps) * 100)
  const currentContent = lesson.content[currentStep]
  const isLastStep = currentStep === totalSteps - 1
  const isQuizStep = currentContent.type === "quiz"

  const handleNext = () => {
    if (isQuizStep && selectedAnswer === null) {
      return // Don't proceed if no answer selected
    }

    if (isQuizStep && !completedSteps.includes(currentStep)) {
      const isCorrect = selectedAnswer === currentContent.correctAnswer
      setIsAnswerCorrect(isCorrect)

      if (isCorrect) {
        setCompletedSteps((prev) => [...prev, currentStep])
      }

      return // Don't advance to next step until they get it right or review the answer
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep])
    }

    if (isLastStep) {
      // If all steps are completed, allow completion
      if (completedSteps.length === totalSteps - 1) {
        onComplete()
      }
    } else {
      setCurrentStep((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    }
  }

  const renderContent = () => {
    switch (currentContent.type) {
      case "text":
        return <div className="prose dark:prose-invert max-w-none">{currentContent.content}</div>
      case "image":
        return (
          <div className="flex justify-center my-4">
            <Image
              src={currentContent.url || "/placeholder.svg"}
              alt={currentContent.alt || "Lesson image"}
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
        )
      case "quiz":
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
              <h3 className="text-lg font-medium">{currentContent.question}</h3>
            </div>

            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
            >
              {currentContent.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 py-2">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {isAnswerCorrect !== null && (
              <Card className={`p-4 ${isAnswerCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
                <div className="flex items-start gap-2">
                  {isAnswerCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{isAnswerCorrect ? "Correct!" : "Incorrect!"}</p>
                    <p className="text-sm">
                      {isAnswerCorrect
                        ? "Great job! You got the right answer."
                        : `The correct answer is: ${currentContent.options?.[currentContent.correctAnswer || 0]}`}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )
      default:
        return <div>Unsupported content type</div>
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lesson.title}</DialogTitle>
          <DialogDescription>
            {lesson.category} • {lesson.duration} • {lesson.xpReward} XP
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="min-h-[300px] py-4">{renderContent()}</div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </div>

          <Button onClick={handleNext} disabled={isQuizStep && selectedAnswer === null && isAnswerCorrect === null}>
            {isLastStep && completedSteps.length === totalSteps - 1 ? "Complete Lesson" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
