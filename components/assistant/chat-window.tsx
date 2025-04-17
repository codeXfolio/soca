"use client"

import { useEffect, useRef } from "react"
import { ChatBubble } from "./chat-bubble"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatWindowProps {
  messages: Message[]
  isTyping: boolean
}

export function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 chat-window">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message.content} sender={message.sender} time={message.timestamp} />
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.4s]"></div>
            </div>
            <span>AI is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
