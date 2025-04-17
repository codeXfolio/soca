import type React from "react"
export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="h-full overflow-auto p-4 md:p-6 lg:p-8">{children}</div>
    </main>
  )
}
