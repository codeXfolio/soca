import {
   LayoutDashboard,
   MessageSquareText,
   Wrench,
   AppWindowIcon,
   Settings,
   Gift,
   GraduationCap,
} from "lucide-react";
import type { MenuItem } from "@/types/menu";

export const menuItems: MenuItem[] = [
   {
      title: "Main",
      items: [
         {
            label: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
            path: "/dashboard",
         },
         {
            label: "AI Assistant",
            icon: <MessageSquareText className="h-5 w-5" />,
            path: "/assistant",
         },
      ],
   },
   {
      title: "Explore",
      items: [
         {
            label: "Tools",
            icon: <Wrench className="h-5 w-5" />,
            path: "/tools",
         },
         {
            label: "Dapp Explorer",
            icon: <AppWindowIcon className="h-5 w-5" />,
            path: "/dapps",
         },
         {
            label: "Airdrops",
            icon: <Gift className="h-5 w-5" />,
            path: "/airdrops",
         },
         {
            label: "Learn to Earn",
            icon: <GraduationCap className="h-5 w-5" />,
            path: "/learn",
         },
      ],
   },
];
