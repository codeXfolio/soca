import { usePathname } from "next/navigation";
import type React from "react";
export function MainContent({ children }: { children: React.ReactNode }) {
   const pathName = usePathname();
   return (
      <main className="flex-1 flex flex-col overflow-hidden">
         <div
            className={`h-full overflow-auto p-4 md:p-6 lg:${
               pathName === "/assistant" ? "p-2" : "p-6"
            } bg-background`}
         >
            {children}
         </div>
      </main>
   );
}
