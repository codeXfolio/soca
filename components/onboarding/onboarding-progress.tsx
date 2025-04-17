"use client"

import type React from "react"

interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[101] pointer-events-auto">
      <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border">
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                index <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
