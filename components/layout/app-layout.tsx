"use client"

import type React from "react"

import { useState } from "react"
import { SidebarNavigation } from "./sidebar-navigation"
import { Topbar } from "./topbar"
import { MainContent } from "./main-content"
import { menuItems } from "@/lib/menu-items"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <SidebarNavigation menuItems={menuItems} isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}
