"use client";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBarProps {
   categories: string[];
   selectedCategories: string[];
   sortBy: "popular" | "newest" | "rating";
   onCategoriesChange: (categories: string[]) => void;
   onSortByChange: (sortBy: "popular" | "newest" | "rating") => void;
}

export function FilterBar({
   categories,
   selectedCategories,
   sortBy,
   onCategoriesChange,
   onSortByChange,
}: FilterBarProps) {
   const sortOptions = [
      { value: "popular", label: "Most Popular" },
      { value: "newest", label: "Newest" },
      { value: "rating", label: "Highest Rated" },
   ];

   return (
      <div className="flex flex-wrap items-center gap-2">
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                     {selectedCategories.length === 0
                        ? "All Categories"
                        : selectedCategories.length === 1
                        ? selectedCategories[0]
                        : `${selectedCategories.length} categories selected`}
                     <ChevronDown className="ml-2 h-3 w-3" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onCategoriesChange([])}>
                     All Categories
                     {selectedCategories.length === 0 && (
                        <Check className="ml-2 h-4 w-4" />
                     )}
                  </DropdownMenuItem>
                  {categories.map((category) => (
                     <DropdownMenuItem
                        key={category}
                        onClick={() => {
                           if (selectedCategories.includes(category)) {
                              onCategoriesChange(
                                 selectedCategories.filter(
                                    (c) => c !== category
                                 )
                              );
                           } else {
                              onCategoriesChange([
                                 ...selectedCategories,
                                 category,
                              ]);
                           }
                        }}
                     >
                        <div className="flex items-center">
                           <div className="mr-2 h-4 w-4 rounded-sm border flex items-center justify-center">
                              {selectedCategories.includes(category) && (
                                 <Check className="h-3 w-3" />
                              )}
                           </div>
                           {category}
                        </div>
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-medium">Sort:</span>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                     {
                        sortOptions.find((option) => option.value === sortBy)
                           ?.label
                     }
                     <ChevronDown className="ml-2 h-3 w-3" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                     <DropdownMenuItem
                        key={option.value}
                        onClick={() => onSortByChange(option.value as any)}
                     >
                        {option.label}
                        {sortBy === option.value && (
                           <Check className="ml-2 h-4 w-4" />
                        )}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         {selectedCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
               <span className="text-sm text-muted-foreground">
                  Active filters:
               </span>
               {selectedCategories.map((category) => (
                  <Badge
                     key={category}
                     variant="secondary"
                     className="capitalize"
                  >
                     {category}
                     <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-4 w-4 p-0"
                        onClick={() =>
                           onCategoriesChange(
                              selectedCategories.filter((c) => c !== category)
                           )
                        }
                     >
                        <X className="h-3 w-3" />
                        <span className="sr-only">
                           Remove {category} filter
                        </span>
                     </Button>
                  </Badge>
               ))}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-7"
                  onClick={() => onCategoriesChange([])}
               >
                  Clear all
               </Button>
            </div>
         )}
      </div>
   );
}
