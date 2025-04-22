"use client";

import { useState } from "react";
import { DappSearchBar } from "./dapp-search-bar";
import { DappCard } from "./dapp-card";
import { FilterBar } from "./filter-bar";
import { Pagination } from "./pagination";

// Update the Dapp interface to use categories array instead of a single category
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

export function DappExplorer() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [sortBy, setSortBy] = useState<"popular" | "newest" | "rating">(
      "popular"
   );
   // Add pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 12;

   // Update the mock data to use categories arrays
   const dapps: Dapp[] = [
      {
         id: "2i7auxv07yf",
         name: "2p2e",
         description:
            "2P2E is an on-chain prediction and gaming platform offering\n               interactive markets and game-play.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/0a45707a353e_2_P2_Elogo_3fe6099fbf.jpg",
         categories: ["Consumer", "Gaming"],
         website: "https://soneium.2p2e.io/",
         twitter: "https://x.com/2p2eio",
         chain: "Soneium",
         url: "https://soneium.2p2e.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "3892l0ioedf",
         name: "Across",
         description: "Interoperability Powered By Intents.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Across_0772a02c90.svg",
         categories: ["Interoperability"],
         website: "https://across.to/",
         twitter: "https://x.com/acrossprotocol",
         chain: "Soneium",
         url: "https://across.to/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "p0x08l6uwc8",
         name: "Alchemy",
         description: "The most reliable way to build web3 apps.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/alchemy_95b2d9adee.svg",
         categories: ["Infra"],
         website: "https://alchemy.com",
         twitter: "https://x.com/Alchemy",
         chain: "Soneium",
         url: "https://alchemy.com",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "66ygm0m32hp",
         name: "Alchemy Pay",
         description:
            "Alchemy Pay is a payment gateway that seamlessly connects crypto\n               with traditional fiat currencies for businesses, developers, and\n               end users.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Alchemy_Pay_8a5fc26df8.svg",
         categories: ["Infra"],
         website: "https://alchemypay.org/",
         twitter: "https://x.com/AlchemyPay",
         chain: "Soneium",
         url: "https://alchemypay.org/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "344m0d246d6",
         name: "Algem",
         description: "Liquidity for your staking and farming assets.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Algem_f5b951b549.svg",
         categories: ["DeFi"],
         website: "https://www.algem.io/",
         twitter: "https://x.com/Algem_io",
         chain: "Soneium",
         url: "https://www.algem.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "r6z873eedvp",
         name: "Alias",
         description: "The home of virtual creators.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/alias_c68f7919f4.webp",
         categories: ["Entertainment", "Consumer", "Spark Winners"],
         website: "https://app.alias.cm/login",
         twitter: "https://x.com/aliasapp_",
         chain: "Soneium",
         url: "https://app.alias.cm/login",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "np6ithe4qfh",
         name: "All-Access (AAA)",
         description:
            "All-Access brings live entertainment on-chain. Introducing a new\n               age of digital ownership for Real-World Experiences (RWEs).",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Access_024f55d661.svg",
         categories: ["Entertainment", "Consumer"],
         website: "https://www.all-access.io/",
         twitter: "https://x.com/allaccessio",
         chain: "Soneium",
         url: "https://www.all-access.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "ev0k1plgp7k",
         name: "API3",
         description:
            "API3 is a collaborative project to deliver traditional API\n               services to smart contract platforms in a decentralized and\n               trust-minimized way.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/api3_5ddfb65fdd.webp",
         categories: ["Infra"],
         website: "https://api3.org/",
         twitter: "https://x.com/api3dao",
         chain: "Soneium",
         url: "https://api3.org/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "6l7dbdyywp3",
         name: "Arcadia.fun",
         description:
            "Arcadia.fun is a Web3 indie game publisher and guild by OP Games.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/a249157de399_Arcadia_logo_250x250_1_1b93b6ce7c.png",
         categories: ["NFT", "Gaming"],
         website: "https://arcadia.fun",
         twitter: "https://x.com/arcadia_fun",
         chain: "Soneium",
         url: "https://arcadia.fun",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "k0b5gcyxdv9",
         name: "Arcas",
         description:
            "Arcas Champions is a third person ability shooter set on the Ape\n               homeworld where renegades and village elites battle for control\n               over the planets resources whilst wielding the mysterious element\n               of Bastonium.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/arcas_fa3c87ea89.webp",
         categories: ["Gaming", "Spark Winners"],
         website: "https://www.arcas.games/",
         twitter: "https://x.com/ArcasGames",
         chain: "Soneium",
         url: "https://www.arcas.games/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "mj02v5mfu7i",
         name: "Arkada",
         description: "The Web3 Quest-to-Earn Platform Powered by Reputation.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/arkada_662b78ec9f.svg",
         categories: ["Social"],
         website: "https://arkada.gg/",
         twitter: "https://x.com/Arkada_gg",
         chain: "Soneium",
         url: "https://arkada.gg/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "nbkujnbi6p",
         name: "Aspecta",
         description:
            "Aspecta builds an AI-powered asset network for vetted builders\n               and projects, the new paradigm of the decentralized builder\n               economy.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Aspecta_2292b424f6.svg",
         categories: ["Social"],
         website: "https://trade.aspecta.ai/",
         twitter: "https://x.com/aspecta_ai",
         chain: "Soneium",
         url: "https://trade.aspecta.ai/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "knbh1qg3y0k",
         name: "Astar Network",
         description:
            "Creating opportunities for individuals to use web3 technology.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/astar_496a64b17e.webp",
         categories: ["Protocol"],
         website: "https://astar.network",
         twitter: "https://x.com/astarnetwork",
         chain: "Soneium",
         url: "https://astar.network",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "vfqf2ho36k9",
         name: "Astar Portal",
         description: "A one-stop-place to interact with the Astar ecosystem.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Astar_0ddc41edd1.png",
         categories: ["Interoperability"],
         website: "https://portal.astar.network/astar/bridge/ccip",
         twitter: "https://x.com/AstarNetwork",
         chain: "Soneium",
         url: "https://portal.astar.network/astar/bridge/ccip",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "trliwqg951q",
         name: "Ava Protocol",
         description:
            "Ava Protocol is an event-driven enabling private autonomous\n               super-transactions for DeFi, NFTs, and games.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Ava_551fe2db92.svg",
         categories: ["Infra"],
         website: "https://avaprotocol.org/",
         twitter: "https://x.com/ava_protocol",
         chain: "Soneium",
         url: "https://avaprotocol.org/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "my2p8fdest",
         name: "Avalon Labs",
         description:
            "Avalon Labs is transforming the future of Bitcoin lending with\n               the first-ever CeDeFi and BTC LSDFi marketplace.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Avalon_967ee5ea21.svg",
         categories: ["DeFi"],
         website: "https://www.avalonfinance.xyz/",
         twitter: "https://x.com/avalonfinance_",
         chain: "Soneium",
         url: "https://www.avalonfinance.xyz/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "f1bhvrqr2x",
         name: "Berkeley",
         description:
            "Berkeley Blockchain Xcelerator is a leading decentralization and\n               AI accelerator program.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/berkley_54c4387783.webp",
         categories: ["VC"],
         website: "https://xcelerator.berkeley.edu/",
         twitter: "https://x.com/xcelerator",
         chain: "Soneium",
         url: "https://xcelerator.berkeley.edu/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "wiw4rh6s5dc",
         name: "Bifrost",
         description:
            "Bifrost is a dedicated liquid staking appchain leveraging off the\n               Polkadot SDK and serving the omni-chain ecosystem.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Bifrost_9cfb7b6a17.svg",
         categories: ["DeFi"],
         website: "https://bifrost.io/",
         twitter: "https://x.com/Bifrost",
         chain: "Soneium",
         url: "https://bifrost.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "7xl0l604138",
         name: "Biru",
         description:
            "Biru, an independent community's hub for the Soneium blockchain,\n               offering NFT minting, trading, entertainment events info, and\n               social interaction",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Biru_73c3817001.svg",
         categories: ["Entertainment"],
         website: "http://biru.gg",
         twitter: "https://x.com/Biru_gg",
         chain: "Soneium",
         url: "http://biru.gg",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "gu7j1m4amm6",
         name: "Bitget Wallet",
         description:
            "Bitget Wallet offers a comprehensive range of on-chain products\n               and DeFi services to our users, including wallet functionality,\n               Swap feature, NFT trading, DApp browsing, and more.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/bitget_wallet_9c0966124a.webp",
         categories: ["Wallet"],
         website: "https://web3.bitget.com/en",
         twitter: "https://x.com/BitgetWallet",
         chain: "Soneium",
         url: "https://web3.bitget.com/en",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "5o9uo8xdpaj",
         name: "Bitkraft",
         description:
            "Leading early stage gaming investment platform focusing on seed,\n               Series A, and Series B gaming firms with over $1b AUM.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/bitkraft_655f5348ed.svg",
         categories: ["VC"],
         website: "https://www.bitkraft.vc/",
         twitter: "https://x.com/BITKRAFTVC",
         chain: "Soneium",
         url: "https://www.bitkraft.vc/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "xlxhm4si3m",
         name: "Blockaid",
         description:
            "Blockaid is a cybersecurity platform that helps Soneium detect\n               and block OFAC sanctioned addresses, IP infringement sites,\n               tokens and scams.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Blockaid_5fb47eb44a.png",
         categories: ["Infra"],
         website: "https://blockaid.io",
         twitter: "https://x.com/blockaid_",
         chain: "Soneium",
         url: "https://blockaid.io",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "qdutxh04bqi",
         name: "Blockscout",
         description:
            "Blockscout is an open-source block explorer for inspecting and\n               analyzing EVM based blockchains. Explore Like Never Before.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Blockscout_95b8fca288.svg",
         categories: ["Explorer"],
         website: "https://www.blockscout.com/",
         twitter: "https://x.com/blockscoutcom",
         chain: "Soneium",
         url: "https://www.blockscout.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "wihgo570z2r",
         name: "Blockus",
         description:
            "Blockus is your all-in-one ecosystem for Web3 gaming, offering\n               beautifully built and fully compliant solutions seamlessly\n               integrated into your game.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/blockus_4c2d8d223c.webp",
         categories: ["Gaming", "Spark Winners"],
         website: "https://www.blockus.gg/",
         twitter: "https://x.com/BlockusGG",
         chain: "Soneium",
         url: "https://www.blockus.gg/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "ox6if4wiqon",
         name: "Blubird",
         description:
            "Blubird simplifies blockchain adoption with tokenized assets.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/BB_51a18d2bca.jpeg",
         categories: ["Infra"],
         website: "https://www.getblubird.com/",
         twitter: "https://x.com/blubird_app",
         chain: "Soneium",
         url: "https://www.getblubird.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "a8nboqn9h6e",
         name: "Chainlink",
         description:
            "Chainlink is the industry-standard decentralized computing\n               platform powering the verifiable web.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/chainlink_1c03f9a30b.svg",
         categories: ["Interoperability", "Protocol"],
         website: "https://chain.link",
         twitter: "https://x.com/chainlink",
         chain: "Soneium",
         url: "https://chain.link",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "qjl92fjxgim",
         name: "Chainsight",
         description:
            "Chainsight is a no-code oracle platform enabling anyone to\n               create, share, and scale on-chain data.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Horizontal_black_55e463e3c1.png",
         categories: ["Infra"],
         website: "https://chainsight.network/",
         twitter: "https://x.com/Chainsight_",
         chain: "Soneium",
         url: "https://chainsight.network/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "nd2qw0kg9o",
         name: "Circle",
         description:
            "Circle is the issuer of USDC and EURC stablecoins - highly\n               liquid, interoperable, and trusted money protocols on the\n               internet.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/circle_f876d9e683.svg",
         categories: ["Protocol"],
         website: "https://www.circle.com",
         twitter: "https://x.com/circle",
         chain: "Soneium",
         url: "https://www.circle.com",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "yv204vu8rw",
         name: "Clique",
         description:
            "Clique's TEE network transforms smart contract and dApp\n               development with secure, efficient off-chain computation, like\n               AWS Lambda but for blockchain.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Clique_7f2b55fe35.svg",
         categories: ["Infra"],
         website: "https://www.clique.tech/",
         twitter: "https://x.com/clique2046",
         chain: "Soneium",
         url: "https://www.clique.tech/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "fqx3xiukhj",
         name: "CoinGecko",
         description:
            "CoinGecko is the world's largest independent cryptocurrency data\n               aggregator.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/image_29_adbab509f0.png",
         categories: ["Infra"],
         website: "https://www.coingecko.com/",
         twitter: "https://x.com/coingecko",
         chain: "Soneium",
         url: "https://www.coingecko.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "f84vm6hhzep",
         name: "Comet Protocol",
         description:
            "The seamless interlink communication protocol from Ethereum\n               ecosystem aggregator for all Layer 1s.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Comet_Protocol_a04885e501.svg",
         categories: ["Interoperability"],
         website:
            "https://cometbridge.app/?original=Arbitrum&target=Soneium&symbol=ETH",
         twitter: "https://x.com/Comet_Protocol",
         chain: "Soneium",
         url: "https://cometbridge.app/?original=Arbitrum&target=Soneium&symbol=ETH",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "737ehadj0no",
         name: "Common",
         description:
            "An all-in-one space to launch tokens, grow communities, and earn\n               rewards.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/8f8f0fb2528e_Alternate_61b2011a33.png",
         categories: ["Social"],
         website: "https://www.common.xyz",
         twitter: "https://x.com/commondotxyz",
         chain: "Soneium",
         url: "https://www.common.xyz",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "9r2d6mq6jet",
         name: "coNFT",
         description:
            "coNFT.app, a leading Web3 Utility Hub that encompasses an NFT\n               aggregator, Launchpad, Web3 Domain Service, and Bridge.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/16845c8293c2_CONFT_f1941b0933.png",
         categories: ["NFT"],
         website: "https://conft.app",
         twitter: "https://x.com/ConftApp",
         chain: "Soneium",
         url: "https://conft.app",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "s5t4go0ghv9",
         name: "CredShields",
         description:
            "Shield your Web3 project with multiple layers of defence.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Cred_Shields_fc8b0bfd18.svg",
         categories: ["Infra"],
         website: "https://credshields.com/",
         twitter: "https://x.com/CredShields",
         chain: "Soneium",
         url: "https://credshields.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "jxq8xbp4pi",
         name: "Crossmint",
         description:
            "Crossmint is the leading enterprise web3 infrastructure provider.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Crossmint_2e4e146ed9.svg",
         categories: ["Infra"],
         website: "https://www.crossmint.com/",
         twitter: "https://x.com/crossmint",
         chain: "Soneium",
         url: "https://www.crossmint.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "0o3go8buhw4",
         name: "Ctrl",
         description:
            "Ctrl is a self-custody, multi-chain wallet that supports over\n               2,100+ blockchains.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Ctrl_a09853104e.svg",
         categories: ["Wallet"],
         website: "https://ctrl.xyz",
         twitter: "https://x.com/ctrl_wallet",
         chain: "Soneium",
         url: "https://ctrl.xyz",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "3d4usge8om7",
         name: "Cur8",
         description:
            "Cur8 is a multi-chain NFT marketplace aggregator and digital\n               asset display suite.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/2c56818fd25e_Logo_1_4b97e50948.svg",
         categories: ["Social", "Entertainment", "NFT"],
         website: "https://www.cur8.io/",
         twitter: "https://x.com/Cur8Labs",
         chain: "Soneium",
         url: "https://www.cur8.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "6esn7jnlolm",
         name: "Cyfrin",
         description:
            "Cyfrin helps secure the top protocols and organizations in DeFi.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/cyfrin_5433930056.webp",
         categories: ["Infra"],
         website: "https://www.cyfrin.io/",
         twitter: "https://x.com/cyfrinaudits",
         chain: "Soneium",
         url: "https://www.cyfrin.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "uy8o3i9qtnq",
         name: "Daemons",
         description:
            "Custom pets that reflect your blockchain fingerprint, PvP, PvE,\n               AI integration.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Daemons_Logo_e8b74e7717.png",
         categories: ["Gaming"],
         website: "https://daemons.app/#ABOUT",
         twitter: "https://x.com/daemons_gamefi?s=21",
         chain: "Soneium",
         url: "https://daemons.app/#ABOUT",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "jcoduhjw5i9",
         name: "DappRadar",
         description: "The World’s Dapp Store.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Dapp_Radar_94ac010a78.svg",
         categories: ["Infra"],
         website: "https://dappradar.com/",
         twitter: "https://x.com/DappRadar",
         chain: "Soneium",
         url: "https://dappradar.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "bf5ct3hzcpm",
         name: "Decasonic",
         description:
            "Decasonic is the venture and digital assets fund building\n               blockchain innovation.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/decasonic_fbdf222200.webp",
         categories: ["VC"],
         website: "https://www.decasonic.com",
         twitter: "https://x.com/decasonic",
         chain: "Soneium",
         url: "https://www.decasonic.com",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "pzu81dof1l",
         name: "DefiLlama",
         description:
            "We track TVL metrics for + 20 projects on Soneium. We also have\n               stablecoins and bridge data for Soneium",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/7e3f52c29dfc_L_Qw_S_x0l_400x400_286ff2818e.jpg",
         categories: ["Infra"],
         website: "https://defillama.com/",
         twitter: "https://x.com/DefiLlama",
         chain: "Soneium",
         url: "https://defillama.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "x0qeeoes41",
         name: "Deform",
         description: "DeForm is the one-stop shop for for onchain growth.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/deform_44e3b5857d.webp",
         categories: ["Consumer"],
         website: "https://www.deform.cc/",
         twitter: "https://x.com/deformapp",
         chain: "Soneium",
         url: "https://www.deform.cc/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "bwtpfiq63xw",
         name: "Deksa",
         description: "First ever RWA from Real World Kingdom.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Deksa_a4d7540059.svg",
         categories: ["NFT"],
         website: "https://www.projectdeksa.com/product",
         twitter: "https://x.com/projectdeksa",
         chain: "Soneium",
         url: "https://www.projectdeksa.com/product",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "3bh0rpb58cn",
         name: "Delphi Ventures",
         description:
            "Delphi Ventures is thesis-driven, high-conviction funds that\n               allocate across core themes.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Delphi_f10a2c8d68.svg",
         categories: ["VC"],
         website: "https://delphiventures.io/",
         twitter: "https://x.com/Delphi_Ventures",
         chain: "Soneium",
         url: "https://delphiventures.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "llq46zqm19n",
         name: "DFG",
         description:
            "Digital Finance Group (DFG) is a leading global Web3 investment\n               and venture firm.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/DFG_f02e38791c.png",
         categories: ["VC"],
         website: "https://www.dfg.group/",
         twitter: "https://x.com/DFG__Official",
         chain: "Soneium",
         url: "https://www.dfg.group/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "in6qwgykdtl",
         name: "Dynamic",
         description:
            "Dynamic offers one flexible SDK for every wallet interaction,\n               combining authentication, smart wallets, and secure key\n               management.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/52cd78620a3e_image_2_1_488706f746.png",
         categories: ["Infra"],
         website: "https://www.dynamic.xyz",
         twitter: "https://x.com/dynamic_xyz",
         chain: "Soneium",
         url: "https://www.dynamic.xyz",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "y5uhaeu1yz",
         name: "Elfin Metaverse",
         description: "GameFi Omni Layer Focus on eSports.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/elfin_996845908b.svg",
         categories: ["Gaming"],
         website: "https://elfinmetaverse.com/",
         twitter: "https://x.com/elfingames",
         chain: "Soneium",
         url: "https://elfinmetaverse.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "rr6h9pk2a2i",
         name: "eOracle",
         description:
            "eOracle is the most secure and decentralized oracle network with\n               170,000 stakers, 130 validators and $10B staked ETH security.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/eo_monogram_b7e041f759.png",
         categories: ["Infra"],
         website: "https://www.eoracle.io",
         twitter: "https://x.com/eoracle_network",
         chain: "Soneium",
         url: "https://www.eoracle.io",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "rh8ml9wgohr",
         name: "Ethereum Attestation Service (EAS)",
         description:
            "Infrastructure protocol for making attestations onchain or\n               offchain about anything.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/eas_effe9415d2.webp",
         categories: ["Infra"],
         website: "https://attest.org",
         twitter: "https://x.com/eas_eth",
         chain: "Soneium",
         url: "https://attest.org",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "hqq6c7tgl8",
         name: "Evermoon",
         description:
            "5v5 three-lanes MOBA game that on-board Web 2.0 player to become\n               Web 3.0 player with 0 blockchain knowledge need.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/evermoon_844710e672.webp",
         categories: ["Gaming", "Spark Winners"],
         website: "https://www.evermoon.games/",
         twitter: "https://x.com/EverMoon_nft",
         chain: "Soneium",
         url: "https://www.evermoon.games/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "zzl994hbqqf",
         name: "Fan Marketing Platform",
         description:
            "Make NFTs easier and effortlessly create new connections with\n               your customers.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/FMK_313ecc0fd0.jpg",
         categories: ["Entertainment", "NFT"],
         website: "https://snft.site/ja/fanmarketingpf/",
         chain: "Soneium",
         url: "https://snft.site/ja/fanmarketingpf/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "2vlajf98vzm",
         name: "Farm Frens",
         description:
            "Farm Frens is an adorkable, soon-to-be omni-platform farming game\n               developed by Amihan Entertainment, which was founded by\n               ex-Riot-Games veterans.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/25dbda05c806_Farm_Frens_Logo_3508_2359_bb4ce1c1a8.png",
         categories: ["Gaming", "Entertainment", "Consumer"],
         website: "https://farmfrens.com",
         twitter: "https://x.com/farmfrenslol",
         chain: "Soneium",
         url: "https://farmfrens.com",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "anlo1oytz15",
         name: "Fireblocks",
         description:
            "Fireblocks is an enterprise platform to manage digital asset\n               operations and build innovative businesses on blockchain.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Fireblocks_55586606f1.svg",
         categories: ["Infra"],
         website: "https://www.fireblocks.com",
         twitter: "https://x.com/FireblocksHQ",
         chain: "Soneium",
         url: "https://www.fireblocks.com",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "ubs8ecax0t",
         name: "Flickplay",
         description:
            "The destination to unlock game-ready digital characters from your\n               favorite IPs and discover experiences to play and socialize with\n               them.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/flickplay_789be98756.webp",
         categories: ["Entertainment", "Consumer", "Spark Winners"],
         website: "https://flickplay.co/",
         twitter: "https://x.com/flickplayapp",
         chain: "Soneium",
         url: "https://flickplay.co/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "sod73vvfdk",
         name: "Fractal Visions",
         description:
            "Optimism centric creator platform for public goods initiatives.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/fractal_visions_ee42f7f723.webp",
         categories: ["NFT"],
         website: "https://www.fractalvisions.io/",
         twitter: "https://x.com/Fractal_Visions",
         chain: "Soneium",
         url: "https://www.fractalvisions.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "rmk5jmn8g8n",
         name: "FrensDAO",
         description:
            "Frens is a venture syndicate comprised of web3 founders, builders\n               and c-level executives backed by Sequioa, Paradigm, Binance and\n               other leading funds",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/frensdao_8ce0b58840.webp",
         categories: ["VC"],
         website: "https://frensdao.io/",
         twitter: "https://x.com/FrensSyndicate",
         chain: "Soneium",
         url: "https://frensdao.io/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "mal8oju5gq",
         name: "Galxe",
         description:
            "Galxe Quest is the leading platform for building web3\n               communities.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/Galxe_0805e59763.svg",
         categories: ["Social"],
         website: "https://www.galxe.com/",
         twitter: "https://x.com/Galxe",
         chain: "Soneium",
         url: "https://www.galxe.com/",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "il46u9b6sz",
         name: "Gamestarter",
         description:
            "The Ultimate GameFi Platform for game developers and publishers\n               that provides audience, funding, and revenue by uniting web2 and\n               web3 revenue streams in one place by bringing GameFi and\n               AI-powered tools.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/gamestarter_02d9ffc63e.webp",
         categories: ["Gaming"],
         website: "https://gamestarter.com/en/game-social",
         twitter: "https://x.com/gamestarter",
         chain: "Soneium",
         url: "https://gamestarter.com/en/game-social",
         isBookmarked: false,
         rating: 5,
      },
      {
         id: "7l2fdy1vtfo",
         name: "Gate Wallet",
         description:
            "Gate.io Web3 multi-terminal encrypted wallet. With Gate Wallet,\n               you can easily manage assets across over 200+ different\n               blockchain networks, access millions of cryptocurrencies, and\n               interact with tens of thousands of DApps.",
         logo: "https://supportive-cats-6a5567a5a5.media.strapiapp.com/6eaa67ba9932_LOGO_1_544c799751.png",
         categories: ["Wallet"],
         website: "https://www.gate.io/web3",
         twitter: "https://x.com/GateWallet",
         chain: "Soneium",
         url: "https://www.gate.io/web3",
         isBookmarked: false,
         rating: 5,
      },
   ];

   const handleToggleBookmark = (dappId: string) => {
      // In a real app, this would update state or call an API
      console.log(`Toggle bookmark for dapp ${dappId}`);
   };

   const handleRatingChange = (dappId: string, rating: number) => {
      // In a real app, this would update state or call an API
      console.log(`Update rating for dapp ${dappId} to ${rating}`);
   };

   // Update the filter logic to handle multiple categories
   const filteredDapps = dapps.filter((dapp) => {
      const matchesSearch =
         dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         dapp.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
         selectedCategories.length === 0 ||
         dapp.categories.some((category) =>
            selectedCategories.includes(category)
         );

      return matchesSearch && matchesCategory;
   });

   // Sort dapps based on sortBy
   const sortedDapps = [...filteredDapps].sort((a, b) => {
      if (sortBy === "rating") {
         return b.rating - a.rating;
      } else if (sortBy === "newest") {
         // In a real app, this would sort by date
         return Number.parseInt(b.id) - Number.parseInt(a.id);
      } else {
         // Default: popular
         return b.rating - a.rating;
      }
   });

   // Calculate pagination
   const totalPages = Math.ceil(sortedDapps.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentDapps = sortedDapps.slice(startIndex, endIndex);

   // Reset to first page when filters change
   const handleFiltersChange = (categories: string[]) => {
      setSelectedCategories(categories);
      setCurrentPage(1);
   };

   const handleSearchChange = (query: string) => {
      setSearchQuery(query);
      setCurrentPage(1);
   };

   const handleSortChange = (sort: "popular" | "newest" | "rating") => {
      setSortBy(sort);
      setCurrentPage(1);
   };

   return (
      <div className="space-y-6">
         <DappSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
         />

         <FilterBar
            categories={[
               "Consumer",
               "Gaming",
               "Social",
               "Infra",
               "Protocol",
               "DeFi",
               "NFT",
               "VC",
               "Wallet",
               "Spark Winners",
               "Interoperability",
            ]}
            selectedCategories={selectedCategories}
            sortBy={sortBy}
            onCategoriesChange={handleFiltersChange}
            onSortByChange={handleSortChange}
         />

         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentDapps.map((dapp) => (
               <DappCard
                  key={dapp.id}
                  dapp={dapp}
                  onToggleBookmark={() => handleToggleBookmark(dapp.id)}
                  onRatingChange={(rating) =>
                     handleRatingChange(dapp.id, rating)
                  }
               />
            ))}
         </div>

         {sortedDapps.length === 0 && (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
               <div className="text-center">
                  <p className="text-lg font-medium">No dapps found</p>
                  <p className="text-sm text-muted-foreground">
                     Try adjusting your search or filters
                  </p>
               </div>
            </div>
         )}

         {sortedDapps.length > 0 && (
            <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={setCurrentPage}
               totalItems={sortedDapps.length}
               itemsPerPage={itemsPerPage}
            />
         )}
      </div>
   );
}
