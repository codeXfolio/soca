"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   BookmarkIcon,
   ExternalLink,
   Globe,
   Twitter,
   MessageSquare,
   Github,
} from "lucide-react";

interface Dapp {
   id: string;
   name: string;
   description: string;
   logo: string;
   categories: string[]; // Changed from category: string to categories: string[]
   chain: string;
   rating: number;
   url: string;
   isBookmarked: boolean;
   website?: string;
   twitter?: string;
   discord?: string;
   github?: string;
}

interface DappCardProps {
   dapp: Dapp;
   onToggleBookmark: () => void;
   onRatingChange: (rating: number) => void;
}

export function DappCard({
   dapp,
   onToggleBookmark,
   onRatingChange,
}: DappCardProps) {
   return (
      <Card className="overflow-hidden transition-all hover:shadow-md">
         <CardHeader className="p-4 pb-0">
            <div className="flex items-start justify-between">
               <div className="flex items-center gap-3">
                  <img
                     src={dapp.logo || "/placeholder.svg"}
                     alt={`${dapp.name} logo`}
                     className="h-10 w-10 rounded-md"
                  />
                  <div>
                     <CardTitle className="text-lg">{dapp.name}</CardTitle>
                     <div className="mt-1 flex items-center gap-2 flex-wrap">
                        {dapp.categories.map((category) => (
                           <Badge
                              key={category}
                              variant="outline"
                              className="text-xs"
                           >
                              {category}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </div>
               <Button
                  variant="ghost"
                  size="icon"
                  className={
                     dapp.isBookmarked
                        ? "text-primary"
                        : "text-muted-foreground"
                  }
                  onClick={onToggleBookmark}
               >
                  <BookmarkIcon className="h-4 w-4" />
                  <span className="sr-only">
                     {dapp.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  </span>
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-4">
            <CardDescription className="line-clamp-2 h-10">
               {dapp.description}
            </CardDescription>
            <div className="mt-4 flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  {dapp.website && (
                     <a
                        href={dapp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                        title="Website"
                     >
                        <Globe className="h-4 w-4" />
                     </a>
                  )}
                  {dapp.twitter && (
                     <a
                        href={dapp.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                        title="Twitter"
                     >
                        <Twitter className="h-4 w-4" />
                     </a>
                  )}
                  {dapp.discord && (
                     <a
                        href={dapp.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                        title="Discord"
                     >
                        <MessageSquare className="h-4 w-4" />
                     </a>
                  )}
                  {dapp.github && (
                     <a
                        href={dapp.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                        title="GitHub"
                     >
                        <Github className="h-4 w-4" />
                     </a>
                  )}
               </div>
            </div>
         </CardContent>
         <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
               <a href={dapp.url} target="_blank" rel="noopener noreferrer">
                  Open Dapp
                  <ExternalLink className="ml-2 h-3 w-3" />
               </a>
            </Button>
         </CardFooter>
      </Card>
   );
}
