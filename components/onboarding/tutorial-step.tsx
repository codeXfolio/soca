"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useOnboarding } from "./onboarding-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Target } from "lucide-react"

interface TutorialStepProps {
  step: {
    title: string
    description: string
    target: string
    placement: "top" | "right" | "bottom" | "left" | "center"
  }
  currentStep: number
  totalSteps: number
}

export const TutorialStep: React.FC<TutorialStepProps> = ({ step, currentStep, totalSteps }) => {
  const { nextStep, prevStep, dismissOnboarding, markPageComplete, currentPage } = useOnboarding()
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [targetElement, setTargetElement] = useState<Element | null>(null)

  useEffect(() => {
    // Find the target element
    let element: Element | null = null

    if (step.target === "body") {
      element = document.body
    } else {
      element = document.querySelector(step.target)
    }

    setTargetElement(element)

    if (element) {
      // Calculate position based on the element and placement
      const rect = element.getBoundingClientRect()
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      let top = 0
      let left = 0

      if (step.placement === "center") {
        top = windowHeight / 2 - 150
        left = windowWidth / 2 - 200
      } else if (step.placement === "top") {
        top = rect.top - 200
        left = rect.left + rect.width / 2 - 200
      } else if (step.placement === "right") {
        top = rect.top + rect.height / 2 - 100
        left = rect.right + 20
      } else if (step.placement === "bottom") {
        top = rect.bottom + 20
        left = rect.left + rect.width / 2 - 200
      } else if (step.placement === "left") {
        top = rect.top + rect.height / 2 - 100
        left = rect.left - 420
      }

      // Ensure the tooltip stays within viewport
      top = Math.max(20, Math.min(windowHeight - 300, top))
      left = Math.max(20, Math.min(windowWidth - 420, left))

      setPosition({ top, left })

      // Highlight the target element
      if (step.target !== "body") {
        element.classList.add("tutorial-highlight")

        // Add a temporary overlay to dim everything except the target
        const overlay = document.createElement("div")
        overlay.className = "tutorial-overlay"
        overlay.style.position = "fixed"
        overlay.style.inset = "0"
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        overlay.style.zIndex = "50"
        overlay.style.pointerEvents = "none"

        // Create a cutout for the target element
        const cutout = document.createElement("div")
        cutout.style.position = "absolute"
        cutout.style.top = `${rect.top - 12}px`
        cutout.style.left = `${rect.left - 12}px`
        cutout.style.width = `${rect.width + 24}px`
        cutout.style.height = `${rect.height + 24}px`
        cutout.style.backgroundColor = "transparent"
        cutout.style.boxShadow = "0 0 0 9999px rgba(0, 0, 0, 0.7)"
        cutout.style.borderRadius = "8px"
        cutout.style.border = "3px solid rgba(59, 130, 246, 0.8)"
        cutout.style.animation = "pulse 2s infinite"

        overlay.appendChild(cutout)
        document.body.appendChild(overlay)

        return () => {
          element?.classList.remove("tutorial-highlight")
          document.body.removeChild(overlay)
        }
      }
    }
  }, [step])

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      // Last step for this page
      markPageComplete(currentPage)
      dismissOnboarding()
    } else {
      nextStep()
    }
  }

  return (
    <div
      className="fixed z-[101] pointer-events-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "400px",
      }}
    >
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            {step.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0} className="h-8 px-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={dismissOnboarding} className="h-8">
              Skip
            </Button>
            <Button size="sm" onClick={handleNext} className="h-8">
              {currentStep === totalSteps - 1 ? "Finish" : "Next"}
              {currentStep !== totalSteps - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
