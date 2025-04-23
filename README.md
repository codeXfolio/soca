# SOCA - AI-Powered Web3 Assistant

SOCA is an intelligent Web3 assistant that helps users interact with blockchain functionality through natural language conversations. It provides a seamless interface for executing transactions, swaps, and other blockchain operations.

## Features

-  Natural language processing for blockchain interactions
-  Support for ETH transfers and token swaps
-  Real-time price feeds and transaction previews
-  Multiple AI model options
-  Theme customization
-  Multi-language support
-  Secure API key management

## Tech Stack

-  Next.js
-  TypeScript
-  Ethers.js
-  Reown/Appkit
-  Tailwind CSS
-  Shadcn UI Components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/soca.git
cd soca
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your API keys:

```
SCS_API_KEY=
OPENROUTER_API_KEY=
NEXT_PUBLIC_BLOCKSCOUT_API_URL=https://soneium-minato.blockscout.com
DATABASE_URL="postgresql://postgres:password@localhost:5432/soca?schema=public"
```

4. Run the migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

## Usage

1. Open the app in your browser:
   http://localhost:3000

2. Start interacting with the assistant:

```bash
"Hey, how much ETH is 100 USD worth?"
```
