"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types/menu";
import Image from "next/image";

interface SidebarNavigationProps {
   menuItems: MenuItem[];
   isMobileOpen: boolean;
   setIsMobileOpen: (open: boolean) => void;
}

export function SidebarNavigation({
   menuItems,
   isMobileOpen,
   setIsMobileOpen,
}: SidebarNavigationProps) {
   const pathname = usePathname();

   return (
      <>
         {/* Mobile overlay */}
         {isMobileOpen && (
            <div
               className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
               onClick={() => setIsMobileOpen(false)}
            />
         )}

         {/* Sidebar */}
         <div
            className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
               isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
         >
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
               <div className="flex items-center space-x-2">
                  <Image src={"/logo.png"} alt="Logo" width={36} height={36} />
                  <span className="text-xl font-bold">SOCA</span>
               </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-auto py-4">
               {menuItems.map((section) => (
                  <div key={section.title} className="px-3 py-2">
                     <h3 className="mb-2 px-3 text-xs font-medium uppercase text-muted-foreground">
                        {section.title}
                     </h3>
                     <div className="space-y-1">
                        {section.items.map((item) => (
                           <Button
                              key={item.path}
                              variant={
                                 pathname === item.path ? "secondary" : "ghost"
                              }
                              className="w-full justify-start"
                              asChild
                           >
                              <Link href={item.path}>
                                 {item.icon}
                                 <span className="ml-2">{item.label}</span>
                              </Link>
                           </Button>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4">
               <div className="space-y-2">
                  <Button
                     variant="outline"
                     className="w-full justify-start"
                     asChild
                  >
                     <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start text-muted-foreground"
                  >
                     <LogOut className="mr-2 h-4 w-4" />
                     Disconnect
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
}
