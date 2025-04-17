import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Sparkles, Zap } from "lucide-react";

export default function LandingPage() {
   return (
      <div className="relative min-h-screen flex flex-col">
         {/* Enhanced animated background */}
         <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base gradient with animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 animate-gradient-shift"></div>

            {/* Animated geometric shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
               {/* Floating hexagons */}
               <div className="absolute top-[15%] left-[10%] w-[100px] h-[100px] rotate-45 border-2 border-blue-400/20 animate-float-slow"></div>
               <div className="absolute top-[60%] right-[15%] w-[150px] h-[150px] rotate-[30deg] border-2 border-purple-400/20 animate-float-reverse"></div>
               <div className="absolute bottom-[20%] left-[20%] w-[80px] h-[80px] rotate-[60deg] border-2 border-indigo-400/20 animate-float"></div>

               {/* Rotating circles */}
               <div className="absolute top-[30%] right-[25%] w-[200px] h-[200px] rounded-full border border-white/10 animate-spin-slow"></div>
               <div className="absolute bottom-[35%] left-[30%] w-[300px] h-[300px] rounded-full border border-white/5 animate-spin-reverse"></div>
            </div>

            {/* Enhanced blobs with glow effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl animate-blob shadow-[0_0_80px_40px_rgba(59,130,246,0.3)]"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-2000 shadow-[0_0_80px_40px_rgba(168,85,247,0.3)]"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-3xl animate-blob animation-delay-4000 shadow-[0_0_80px_40px_rgba(99,102,241,0.3)]"></div>

            {/* Additional smaller blobs */}
            <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] rounded-full bg-cyan-500/20 blur-2xl animate-blob-fast"></div>
            <div className="absolute bottom-[15%] right-[20%] w-[250px] h-[250px] rounded-full bg-pink-500/20 blur-2xl animate-blob-reverse animation-delay-3000"></div>

            {/* Particle effect overlay */}
            <div className="absolute inset-0 bg-[url('/noise-pattern.svg')] opacity-[0.03] mix-blend-soft-light"></div>

            {/* Enhanced grid overlay with pulse */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px] animate-pulse-slow"></div>
         </div>

         {/* Hero section */}
         <main className="flex-1 flex flex-col items-center justify-center px-4 py-36 text-center">
            <div className="max-w-3xl mx-auto">
               <div className="flex items-center justify-center mb-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white ml-4">
                     Soca
                  </h1>
               </div>

               <p className="md:text-2xl text-white/80 mb-8">
                  Your intelligent companion powered by Soneium blockchain for
                  secure, efficient, and seamless Web3 interactions
               </p>

               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg px-8">
                     <Link href="/assistant">
                        Try AI Assistant
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                  </Button>
                  <Button
                     asChild
                     variant="outline"
                     size="lg"
                     className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                     <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
               </div>
            </div>
         </main>

         {/* Values section */}
         <section className="py-16 px-4 md:px-16 relative z-10 backdrop-blur-sm bg-black/30">
            <div className="max-w-7xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                  Why Choose <span className="text-primary">Soneium Chat</span>
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Speed Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 group">
                     <div className="bg-primary/20 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                        <Zap className="h-8 w-8 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">
                        Lightning Fast
                     </h3>
                     <p className="text-white/70">
                        Execute transactions and receive AI responses in
                        seconds, not minutes, with our optimized infrastructure.
                     </p>
                  </div>

                  {/* AI Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 group">
                     <div className="bg-primary/20 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                        <Sparkles className="h-8 w-8 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">
                        Advanced AI
                     </h3>
                     <p className="text-white/70">
                        Powered by state-of-the-art AI models that understand
                        Web3 concepts and can assist with complex tasks.
                     </p>
                  </div>

                  {/* Ecosystem Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 group">
                     <div className="bg-primary/20 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                        <Globe className="h-8 w-8 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">
                        Complete Ecosystem
                     </h3>
                     <p className="text-white/70">
                        Access tools, dapps, airdrops, and educational content
                        all in one place for a seamless Web3 experience.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="py-4 px-4 backdrop-blur-lg bg-black/20">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                  <div className="flex items-center mb-4 sm:mb-0">
                     <div className="h-8 w-8 rounded-full bg-primary"></div>
                     <span className="text-white font-bold ml-2">
                        Soneium Chat
                     </span>
                  </div>

                  <div className="flex gap-8">
                     <Link
                        href="/terms"
                        className="text-white/70 hover:text-white transition-colors"
                     >
                        Terms
                     </Link>
                     <Link
                        href="/privacy"
                        className="text-white/70 hover:text-white transition-colors"
                     >
                        Privacy
                     </Link>
                  </div>
               </div>

               <div className="text-center text-white/50 text-sm border-t border-white/10 pt-4">
                  © 2025 Soneium. All rights reserved.
               </div>
            </div>
         </footer>
      </div>
   );
}
