"use client";

import { useState, useEffect } from "react";
import { ChatWindow } from "./chat-window";
import { ChatInputBox } from "./chat-input-box";
import { CommandSuggestions } from "./command-suggestions";
import { AssistantToolTip } from "./assistant-tool-tip";
import {
   TransactionConfirmModal,
   type TransactionDetails,
} from "./transaction-confirm-modal";
import { ModelSelector, type AIModel } from "./model-selector";
import { useRouter } from "next/navigation";

interface Message {
   id: string;
   content: string;
   sender: "user" | "ai";
   timestamp: Date;
}

export function AssistantLayout() {
   const router = useRouter();
   const [messages, setMessages] = useState<Message[]>([
      {
         id: "welcome",
         content:
            "Hello! I'm your Soneium AI Assistant. How can I help you today?",
         sender: "ai",
         timestamp: new Date(),
      },
   ]);
   const [isTyping, setIsTyping] = useState(false);
   const [showTransactionModal, setShowTransactionModal] = useState(false);
   const [pendingMessage, setPendingMessage] = useState<string | null>(null);
   const [transactionDetails, setTransactionDetails] =
      useState<TransactionDetails>({
         type: "swap",
         fromToken: {
            symbol: "ETH",
            amount: "0.1",
            value: "300",
         },
         toToken: {
            symbol: "USDC",
            amount: "300",
            value: "300",
         },
         estimatedGas: "0.002 ETH ($6)",
         network: "Ethereum",
      });

   // Add state for selected AI model
   const [selectedModel, setSelectedModel] = useState<AIModel>({
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Most capable model for complex tasks",
      contextLength: 128000,
   });

   useEffect(() => {
      const handleDismissTooltip = () => {
         setMessages((prev) => {
            // If we only have the welcome message, add a dummy message to prevent the tooltip from showing again
            if (prev.length === 1) {
               return [
                  ...prev,
                  {
                     id: "dummy-message",
                     content: "",
                     sender: "user",
                     timestamp: new Date(),
                  },
               ];
            }
            return prev;
         });
      };

      document.addEventListener(
         "dismissAssistantTooltip",
         handleDismissTooltip
      );

      return () => {
         document.removeEventListener(
            "dismissAssistantTooltip",
            handleDismissTooltip
         );
      };
   }, []);

   const handleSendMessage = (content: string) => {
      if (!content.trim()) return;

      // Add user message immediately for all messages
      const userMessage: Message = {
         id: `user-${Date.now()}`,
         content,
         sender: "user",
         timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Check if the message contains transaction keywords
      const lowerCaseMessage = content.toLowerCase();
      if (
         (lowerCaseMessage.includes("swap") ||
            lowerCaseMessage.includes("exchange") ||
            lowerCaseMessage.includes("convert")) &&
         lowerCaseMessage.includes("eth") &&
         lowerCaseMessage.includes("usdc")
      ) {
         // Parse ETH amount if available
         const ethAmountMatch = content.match(/(\d+\.?\d*)\s*eth/i);
         const ethAmount = ethAmountMatch ? ethAmountMatch[1] : "0.1";

         // Calculate USDC amount (simplified)
         const usdcAmount = (Number.parseFloat(ethAmount) * 3000).toString();

         // Select a provider based on the amount (just for demonstration)
         const amount = Number.parseFloat(ethAmount);
         let provider = "Uniswap V3";
         let routeInfo = {
            route: ["ETH", "USDC"],
            fee: "0.3%",
         };

         // Simulate different providers based on amount
         if (amount > 1.0) {
            provider = "1inch Aggregator";
            routeInfo = {
               route: ["ETH", "WETH", "USDC"],
               fee: "0.15%",
            };
         } else if (amount > 0.5) {
            provider = "SushiSwap";
            routeInfo = {
               route: ["ETH", "USDC"],
               fee: "0.25%",
            };
         }

         setTransactionDetails({
            type: "swap",
            fromToken: {
               symbol: "ETH",
               amount: ethAmount,
               value: (Number.parseFloat(ethAmount) * 3000).toString(),
            },
            toToken: {
               symbol: "USDC",
               amount: usdcAmount,
               value: usdcAmount,
            },
            estimatedGas: "0.002 ETH ($6)",
            network: "Ethereum",
            provider: provider,
            routeInfo: routeInfo,
         });

         // Send AI response first
         setTimeout(() => {
            const aiMessage: Message = {
               id: `ai-${Date.now()}`,
               content: `I can help you swap ${ethAmount} ETH to approximately ${usdcAmount} USDC. I'll use ${provider} for the best rate. The current exchange rate is 1 ETH ≈ 3,000 USDC. Please confirm this transaction in the confirmation window.`,
               sender: "ai",
               timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);

            // Show transaction modal after response
            setTimeout(() => {
               setPendingMessage(content);
               setShowTransactionModal(true);
            }, 500);
         }, 1000);

         return;
      }

      if (
         (lowerCaseMessage.includes("send") ||
            lowerCaseMessage.includes("transfer")) &&
         (lowerCaseMessage.includes("eth") || lowerCaseMessage.includes("usdc"))
      ) {
         // Determine token
         const isEth = lowerCaseMessage.includes("eth");

         // Parse amount if available
         const amountMatch = isEth
            ? content.match(/(\d+\.?\d*)\s*eth/i)
            : content.match(/(\d+\.?\d*)\s*usdc/i);

         const amount = amountMatch ? amountMatch[1] : isEth ? "0.1" : "100";

         // Get recipient address if available, otherwise use a placeholder
         const addressMatch = content.match(/(0x[a-fA-F0-9]{40})/);
         const recipient = addressMatch ? addressMatch[1] : "0x1234...5678";

         setTransactionDetails({
            type: "transfer",
            fromToken: {
               symbol: isEth ? "ETH" : "USDC",
               amount: amount,
               value: isEth
                  ? (Number.parseFloat(amount) * 3000).toString()
                  : amount,
            },
            recipient: recipient,
            estimatedGas: isEth ? "0.001 ETH ($3)" : "0.002 ETH ($6)",
            network: "Ethereum",
         });

         // Send AI response first
         setTimeout(() => {
            const aiMessage: Message = {
               id: `ai-${Date.now()}`,
               content: `I'll help you transfer ${amount} ${
                  isEth ? "ETH" : "USDC"
               } to ${recipient}. Please review and confirm this transaction in the confirmation window.`,
               sender: "ai",
               timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);

            // Show transaction modal after response
            setTimeout(() => {
               setPendingMessage(content);
               setShowTransactionModal(true);
            }, 500);
         }, 1000);

         return;
      }

      // For non-transaction messages, just show typing and then respond
      setIsTyping(true);
      setTimeout(() => {
         const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            content: getAIResponse(content, selectedModel),
            sender: "ai",
            timestamp: new Date(),
         };

         setMessages((prev) => [...prev, aiMessage]);
         setIsTyping(false);
      }, 1000);
   };

   const handleConfirmTransaction = () => {
      if (pendingMessage) {
         // Add a transaction success message
         const transactionMessage: Message = {
            id: `ai-transaction-${Date.now()}`,
            content: getTransactionSuccessMessage(transactionDetails),
            sender: "ai",
            timestamp: new Date(),
         };

         setMessages((prev) => [...prev, transactionMessage]);
         setPendingMessage(null);
         setShowTransactionModal(false);
      }
   };

   const getTransactionSuccessMessage = (tx: TransactionDetails) => {
      switch (tx.type) {
         case "swap":
            return `✅ Transaction complete! I've swapped ${tx.fromToken?.amount} ${tx.fromToken?.symbol} for ${tx.toToken?.amount} ${tx.toToken?.symbol} using ${tx.provider}. The transaction has been submitted to the blockchain and will be confirmed shortly. You can view your updated balance in your wallet.`;
         case "transfer":
            return `✅ Transaction complete! I've transferred ${tx.fromToken?.amount} ${tx.fromToken?.symbol} to ${tx.recipient}. The transaction has been submitted to the blockchain and will be confirmed shortly. You can track this transaction on the explorer.`;
         default:
            return "✅ Transaction complete! Your transaction has been successfully submitted to the blockchain.";
      }
   };

   // Simple mock AI response function
   const getAIResponse = (userMessage: string, model: AIModel): string => {
      const lowerCaseMessage = userMessage.toLowerCase();
      const modelInfo = `[Using ${model.name} by ${model.provider}] `;

      if (
         lowerCaseMessage.includes("hello") ||
         lowerCaseMessage.includes("hi")
      ) {
         return "Hello! How can I assist you with your Web3 journey today?";
      } else if (
         lowerCaseMessage.includes("gas") ||
         lowerCaseMessage.includes("fee")
      ) {
         return "Current gas fees on Ethereum are around 25 Gwei. Would you like me to help optimize your transaction?";
      } else if (
         lowerCaseMessage.includes("swap") ||
         lowerCaseMessage.includes("exchange")
      ) {
         return "I can help you swap tokens. Please tell me which tokens you'd like to exchange and the amount. For example, 'Swap 0.1 ETH to USDC'.";
      } else if (
         lowerCaseMessage.includes("transfer") ||
         lowerCaseMessage.includes("send")
      ) {
         return "I can help you transfer tokens. Please specify the token, amount, and recipient address. For example, 'Send 0.1 ETH to 0x1234...5678'.";
      } else if (
         lowerCaseMessage.includes("token") ||
         lowerCaseMessage.includes("price")
      ) {
         return "I can fetch token prices for you. Which specific token are you interested in?";
      } else if (lowerCaseMessage.includes("nft")) {
         return "I can help you analyze NFT collections, check floor prices, or verify authenticity. What specific NFT information do you need?";
      } else if (lowerCaseMessage.includes("wallet")) {
         return "I can help you manage your wallet, check balances, or analyze transaction history. What would you like to know about your wallet?";
      } else if (
         lowerCaseMessage.includes("model") ||
         lowerCaseMessage.includes("which model")
      ) {
         return `I'm currently using ${model.name} by ${
            model.provider
         }. This model ${model.description.toLowerCase()} and has a context length of ${model.contextLength.toLocaleString()} tokens. You can change the model using the selector at the top of the chat.`;
      } else {
         return "I understand you're asking about Web3. Could you provide more details about what you'd like to know or do?";
      }
   };

   const handleOpenSettings = () => {
      router.push("/settings?tab=api-keys");
   };

   return (
      <div className="flex h-full flex-col overflow-hidden">
         <div className="relative flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b p-2">
               <div className="text-sm font-medium">AI Assistant</div>
               <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  onOpenSettings={handleOpenSettings}
               />
            </div>
            <ChatWindow messages={messages} isTyping={isTyping} />
            <CommandSuggestions onCommandClick={handleSendMessage} />
            <ChatInputBox onSendMessage={handleSendMessage} />
         </div>
         {messages.length === 1 && <AssistantToolTip />}

         <TransactionConfirmModal
            isOpen={showTransactionModal}
            onClose={() => {
               setShowTransactionModal(false);
               setPendingMessage(null);
            }}
            onConfirm={handleConfirmTransaction}
            transaction={transactionDetails}
         />
      </div>
   );
}
