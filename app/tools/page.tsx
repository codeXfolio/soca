import { ToolList } from "@/components/tools/tool-list"

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
        <p className="text-muted-foreground">Powerful utilities for Web3 interactions</p>
      </div>
      <ToolList />
    </div>
  )
}
