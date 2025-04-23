import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatBubbleProps {
   message: string;
   sender: "user" | "ai";
   time: Date;
}

export function ChatBubble({ message, sender, time }: ChatBubbleProps) {
   const isUser = sender === "user";

   return (
      <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
         <div
            className={cn(
               "max-w-[80%] rounded-lg px-4 py-2",
               isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}
         >
            <div className="space-y-1">
               <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
               <p className={cn("text-right text-xs opacity-70")}>
                  {format(time, "h:mm a")}
               </p>
            </div>
         </div>
      </div>
   );
}
