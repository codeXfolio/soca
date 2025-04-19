"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TutorialStep } from "./tutorial-step";
import { OnboardingProgress } from "./onboarding-progress";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type OnboardingState = {
   isActive: boolean;
   currentStep: number;
   currentPage: string;
   completedPages: string[];
   dismissOnboarding: () => void;
   startOnboarding: () => void;
   nextStep: () => void;
   prevStep: () => void;
   skipToPage: (page: string) => void;
   markPageComplete: (page: string) => void;
};

const OnboardingContext = createContext<OnboardingState | undefined>(undefined);

export const useOnboarding = () => {
   const context = useContext(OnboardingContext);
   if (!context) {
      throw new Error(
         "useOnboarding must be used within an OnboardingProvider"
      );
   }
   return context;
};

interface OnboardingProviderProps {
   children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
   children,
}) => {
   const pathname = usePathname();
   const router = useRouter();
   const [isActive, setIsActive] = useState(false);
   const [currentStep, setCurrentStep] = useState(0);
   const [completedPages, setCompletedPages] = useState<string[]>([]);
   const [currentPage, setCurrentPage] = useState(pathname);

   // Load onboarding state from localStorage on mount
   useEffect(() => {
      const savedState = localStorage.getItem("onboardingState");
      if (savedState) {
         const { completedPages, visitedPages } = JSON.parse(savedState);
         setCompletedPages(completedPages || []);

         // If this is the first time visiting this page and it's not the assistant page
         if (
            pathname !== "/assistant" &&
            visitedPages &&
            !visitedPages.includes(pathname)
         ) {
            // Start onboarding automatically
            setTimeout(() => {
               setIsActive(true);

               // Add this page to visited pages
               const updatedVisitedPages = [...(visitedPages || []), pathname];
               saveOnboardingState({
                  completedPages: completedPages || [],
                  visitedPages: updatedVisitedPages,
               });
            }, 1000);
         }
      } else {
         // First time user, initialize state and start tutorial if not on assistant page
         if (pathname !== "/assistant") {
            setTimeout(() => {
               setIsActive(true);
               saveOnboardingState({
                  completedPages: [],
                  visitedPages: [pathname],
               });
            }, 1000);
         }
      }
   }, [pathname]);

   // Update current page when pathname changes
   useEffect(() => {
      setCurrentPage(pathname);
      setCurrentStep(0);
   }, [pathname]);

   // Update the saveOnboardingState function to include visitedPages
   const saveOnboardingState = (state: {
      completedPages: string[];
      visitedPages?: string[];
   }) => {
      const savedState = localStorage.getItem("onboardingState");
      const parsedState = savedState
         ? JSON.parse(savedState)
         : { completedPages: [], visitedPages: [] };

      localStorage.setItem(
         "onboardingState",
         JSON.stringify({
            ...parsedState,
            ...state,
         })
      );
   };

   const dismissOnboarding = () => {
      setIsActive(false);
   };

   const startOnboarding = () => {
      // Don't start onboarding on the assistant page
      if (pathname === "/assistant") {
         return;
      }

      setIsActive(true);
      setCurrentStep(0);
   };

   const nextStep = () => {
      setCurrentStep((prev) => prev + 1);
   };

   const prevStep = () => {
      setCurrentStep((prev) => Math.max(0, prev - 1));
   };

   const skipToPage = (page: string) => {
      router.push(page);
   };

   // Update the markPageComplete function to handle visitedPages
   const markPageComplete = (page: string) => {
      const updatedCompletedPages = [...completedPages];
      if (!updatedCompletedPages.includes(page)) {
         updatedCompletedPages.push(page);
         setCompletedPages(updatedCompletedPages);

         const savedState = localStorage.getItem("onboardingState");
         const parsedState = savedState
            ? JSON.parse(savedState)
            : { visitedPages: [] };

         saveOnboardingState({
            completedPages: updatedCompletedPages,
            visitedPages: parsedState.visitedPages,
         });
      }
   };

   return (
      <OnboardingContext.Provider
         value={{
            isActive,
            currentStep,
            currentPage,
            completedPages,
            dismissOnboarding,
            startOnboarding,
            nextStep,
            prevStep,
            skipToPage,
            markPageComplete,
         }}
      >
         {children}
         {isActive && pathname !== "/assistant" && <OnboardingOverlay />}
      </OnboardingContext.Provider>
   );
};

const OnboardingOverlay: React.FC = () => {
   const { currentPage, currentStep, dismissOnboarding } = useOnboarding();
   const tutorialSteps = getTutorialStepsForPage(currentPage);

   if (currentStep >= tutorialSteps.length) {
      return null;
   }

   return (
      <div className="fixed inset-0 z-[100] pointer-events-none">
         <div
            className="absolute inset-0 bg-black/50 pointer-events-auto"
            onClick={dismissOnboarding}
         />
         <div className="absolute top-4 right-4 z-[101] pointer-events-auto">
            <Button
               variant="ghost"
               size="icon"
               onClick={dismissOnboarding}
               className="bg-background/80 backdrop-blur-sm"
            >
               <X className="h-4 w-4" />
               <span className="sr-only">Close tutorial</span>
            </Button>
         </div>
         <TutorialStep
            step={tutorialSteps[currentStep]}
            currentStep={currentStep}
            totalSteps={tutorialSteps.length}
         />
         <OnboardingProgress
            currentStep={currentStep}
            totalSteps={tutorialSteps.length}
         />
      </div>
   );
};

// Helper function to get tutorial steps for the current page
function getTutorialStepsForPage(pathname: string) {
   // Page-specific tutorial steps
   const tutorialStepsByPage: Record<string, any[]> = {
      "/dashboard": [
         {
            title: "Dashboard Overview",
            description:
               "This is your dashboard where you can see an overview of your portfolio and recent activity.",
            target: "h1",
            placement: "bottom",
         },
         {
            title: "Network Status",
            description:
               "Check the current network status, gas fees, and latest block information here.",
            target: ".network-status-bar",
            placement: "bottom",
         },
         {
            title: "Portfolio Overview",
            description:
               "View your token holdings, total value, and performance metrics in this section.",
            target: ".portfolio-card",
            placement: "left",
         },
         {
            title: "Recent Activity",
            description:
               "See your most recent transactions and activities across blockchains.",
            target: ".recent-activity-card",
            placement: "left",
         },
      ],
      "/tools": [
         {
            title: "Web3 Tools",
            description:
               "Access powerful tools to analyze contracts, scan tokens, and track wallets.",
            target: "h1",
            placement: "bottom",
         },
         {
            title: "Contract Analyzer",
            description:
               "Decode and analyze smart contract functions and events.",
            target: ".tool-card:nth-child(1)",
            placement: "right",
         },
         {
            title: "Token Scanner",
            description:
               "Analyze tokens for risks and opportunities before investing.",
            target: ".tool-card:nth-child(2)",
            placement: "bottom",
         },
         {
            title: "Wallet Tracker",
            description:
               "Track wallet assets and transaction history across multiple chains.",
            target: ".tool-card:nth-child(3)",
            placement: "left",
         },
      ],
      "/dapps": [
         {
            title: "Dapp Explorer",
            description:
               "Discover and interact with decentralized applications across blockchains.",
            target: "h1",
            placement: "bottom",
         },
         {
            title: "Search and Filter",
            description:
               "Search for dapps by name or description and filter by category.",
            target: ".dapp-search-bar",
            placement: "bottom",
         },
         {
            title: "Dapp Cards",
            description:
               "Browse dapps with key information like ratings, categories, and descriptions.",
            target: ".dapp-card:first-child",
            placement: "right",
         },
         {
            title: "Pagination",
            description:
               "Navigate through multiple pages of dapps using the pagination controls.",
            target: ".pagination",
            placement: "top",
         },
      ],
      "/airdrops": [
         {
            title: "Airdrop Explorer",
            description:
               "Discover active and upcoming token airdrops to earn free tokens.",
            target: "h1",
            placement: "bottom",
         },
         {
            title: "Airdrop Filters",
            description:
               "Filter airdrops by blockchain, difficulty, and other criteria.",
            target: ".airdrop-filters",
            placement: "bottom",
         },
         {
            title: "Active vs Incoming",
            description:
               "Switch between currently active airdrops and upcoming opportunities.",
            target: ".tabs-list",
            placement: "bottom",
         },
         {
            title: "Airdrop Details",
            description:
               "Click on an airdrop to see detailed requirements and claim instructions.",
            target: ".airdrop-card:first-child",
            placement: "right",
         },
      ],
      "/learn": [
         {
            title: "Learn to Earn",
            description:
               "Complete lessons and missions to earn XP and tokens while learning about Web3.",
            target: "h1",
            placement: "bottom",
         },
         {
            title: "Your Progress",
            description:
               "Track your learning progress, level, and claimable tokens here.",
            target: ".user-progress-card",
            placement: "bottom",
         },
         {
            title: "Lessons",
            description:
               "Browse and complete interactive lessons on various Web3 topics.",
            target: ".lesson-list",
            placement: "bottom",
         },
         {
            title: "Missions",
            description:
               "Complete special missions to earn bonus XP and rewards.",
            target: ".mission-board",
            placement: "bottom",
         },
      ],
      "/settings": [
         {
            title: "Settings",
            description:
               "Customize your experience and manage your account settings.",
            target: "h1",
            placement: "bottom",
         },
         {
            title: "Settings Tabs",
            description:
               "Navigate between different settings categories using these tabs.",
            target: ".tabs-list",
            placement: "bottom",
         },
         {
            title: "API Keys",
            description:
               "Configure API keys for different AI providers to enhance your assistant.",
            target: ".api-keys-settings",
            placement: "left",
         },
         {
            title: "Theme Settings",
            description:
               "Customize the appearance of the application with different themes.",
            target: ".theme-selector",
            placement: "left",
         },
      ],
   };

   // Get steps for the current page, or return empty array if no specific steps exist
   return tutorialStepsByPage[pathname] || [];
}
