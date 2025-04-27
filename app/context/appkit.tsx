"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { soneiumMinato, soneium } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = "f2b22f45c1ca0b9c95ac4e165cda0899";

// 2. Create a metadata object
const metadata = {
   name: "SOCA - Soneium Chat",
   description:
      "Your intelligent companion powered by Soneium blockchain for secure, efficient, and seamless Web3 interactions",
   url: "https://mywebsite.com", // origin must match your domain & subdomain
   icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
export const modalWc = createAppKit({
   adapters: [new EthersAdapter()],
   defaultAccountTypes: {
      eip155: "eoa",
   },
   metadata,
   networks: [soneium, soneiumMinato],
   projectId,
   features: {
      // analytics: false,
      // email: false,
      // emailShowWallets: false,
      socials: [],
   },
});

export function AppKit({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
