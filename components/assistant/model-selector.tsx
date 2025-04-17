"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, Settings2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  contextLength: number
  isAdvanced?: boolean
}

interface ModelSelectorProps {
  selectedModel: AIModel
  onModelChange: (model: AIModel) => void
  onOpenSettings: () => void
}

export function ModelSelector({ selectedModel, onModelChange, onOpenSettings }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)

  // Sample models from different providers
  const models: AIModel[] = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Most capable model for complex tasks",
      contextLength: 128000,
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      description: "Fast and efficient for most tasks",
      contextLength: 16000,
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      description: "Anthropic's most powerful model",
      contextLength: 200000,
    },
    {
      id: "claude-3-sonnet",
      name: "Claude 3 Sonnet",
      provider: "Anthropic",
      description: "Balanced performance and efficiency",
      contextLength: 180000,
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      description: "Google's advanced reasoning model",
      contextLength: 32000,
    },
    {
      id: "llama-3-70b",
      name: "Llama 3 70B",
      provider: "Meta",
      description: "Meta's open model via OpenRouter",
      contextLength: 8000,
      isAdvanced: true,
    },
    {
      id: "mixtral-8x7b",
      name: "Mixtral 8x7B",
      provider: "Mistral",
      description: "Efficient mixture-of-experts model",
      contextLength: 32000,
      isAdvanced: true,
    },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1 justify-between model-selector">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal">
              {selectedModel.provider}
            </Badge>
            <span className="font-medium">{selectedModel.name}</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {models
            .filter((model) => !model.isAdvanced)
            .map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => {
                  onModelChange(model)
                  setOpen(false)
                }}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="outline" className="font-normal text-xs">
                      {model.provider}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{model.description}</p>
                </div>
                {selectedModel.id === model.id && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Advanced Models</DropdownMenuLabel>
        <DropdownMenuGroup>
          {models
            .filter((model) => model.isAdvanced)
            .map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => {
                  onModelChange(model)
                  setOpen(false)
                }}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="outline" className="font-normal text-xs">
                      {model.provider}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{model.description}</p>
                </div>
                {selectedModel.id === model.id && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onOpenSettings} className="flex items-center gap-2">
          <Settings2 className="h-4 w-4" />
          <span>Configure API Keys</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
