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
import { ethers } from "ethers";
import { fetchEthPrice } from "../helper";

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
         content: `Hello! I'm **SOCA**, your personal assistant. How can I help you today?`,
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
      id: "meta-llama/llama-4-maverick:free",
      name: "Llama-4",
      provider: "Meta",
      description: "For general purpose tasks",
      contextLength: 256000,
   });
   const [action, setAction] = useState<string | null>(null);
   const [data, setData] = useState<any>(null);

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

   interface Txs {
      hash: string;
      timestamp: string;
      amount: string;
      type: string;
      status: string;
   }
   const handleSendMessage = async (content: string) => {
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

      const aiResponse = await getAIResponse(content, selectedModel);
      setIsTyping(true);

      if (aiResponse.error) {
         setMessages((prev) => [
            ...prev,
            {
               id: `ai-${Date.now()}`,
               content: aiResponse.error ? aiResponse.error : "Error",
               sender: "ai",
               timestamp: new Date(),
            },
         ]);
         setIsTyping(false);
         return;
      }

      if (aiResponse.action === "transfer") {
         const ethPrice = await fetchEthPrice();
         setTransactionDetails({
            type: "transfer",
            fromToken: {
               symbol: aiResponse.parameters.token,
               amount: aiResponse.parameters.amount,
               value: (
                  Number.parseFloat(aiResponse.parameters.amount) * ethPrice
               ).toFixed(3),
            },
            recipient: aiResponse.parameters.address,
            estimatedGas: "0.0001 ETH ($0.1)",
            network: "Soneium",
         });
         setMessages((prev) => [
            ...prev,
            {
               id: `ai-${Date.now()}`,
               content: aiResponse.response,
               sender: "ai",
               timestamp: new Date(),
            },
         ]);
         setShowTransactionModal(true);
         setIsTyping(false);
         return;
      }

      if (aiResponse.action === "check_txs") {
         const txs: Txs[] = aiResponse.data;
         const formattedTxs = txs.map((tx) => {
            const truncatedHash =
               tx.hash.slice(0, 6) + "..." + tx.hash.slice(-4);
            return `| ${truncatedHash} | ${
               tx.type == null ? "transfer" : tx.type
            } | ${ethers.formatEther(tx.amount)} ETH | ${new Date(
               tx.timestamp
            ).toLocaleString()} |`;
         });
         formattedTxs.unshift("| Hash | Type | Value | Time |\n|-|-|-|-|");
         setMessages((prev) => [
            ...prev,
            {
               id: `ai-${Date.now()}`,
               content: aiResponse.response + "\n" + formattedTxs.join("\n"),
               sender: "ai",
               timestamp: new Date(),
            },
         ]);
         setIsTyping(false);
         return;
      }

      setMessages((prev) => [
         ...prev,
         {
            id: `ai-${Date.now()}`,
            content:
               typeof aiResponse === "string"
                  ? aiResponse
                  : aiResponse.response,
            sender: "ai",
            timestamp: new Date(),
         },
      ]);
      setIsTyping(false);
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

   interface AIResponse {
      action: string;
      parameters: {
         address: string;
         amount: string;
         token: string;
      };
      response: string;
      error?: string;
      data?: any;
   }
   const getAIResponse = async (
      userMessage: string,
      model: AIModel
   ): Promise<AIResponse> => {
      const lowerCaseMessage = userMessage.toLowerCase();
      const modelInfo = `[Using ${model.name} by ${model.provider}] `;

      const response = await fetch("/api/assistant", {
         method: "POST",
         body: JSON.stringify({
            messages: userMessage,
            model: model.id,
            signature: localStorage.getItem("signature"),
         }),
      });

      const data: AIResponse = await response.json();

      return data;
   };

   const handleOpenSettings = () => {
      router.push("/settings?tab=api-keys");
   };

   return (
      <div className="flex h-full flex-col overflow-hidden">
         <div className="relative flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b px-2 pb-2">
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
         {!localStorage.getItem("assistantTooltipDismissed") && (
            <AssistantToolTip />
         )}

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
