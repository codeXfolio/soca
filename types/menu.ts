import type { ReactNode } from "react"

export interface MenuItemLink {
  label: string
  icon: ReactNode
  path: string
}

export interface MenuItem {
  title: string
  items: MenuItemLink[]
}
