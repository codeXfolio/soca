interface TransactionAddress {
   hash: string;
   is_contract: boolean;
   name?: string;
}

interface TokenInfo {
   name: string;
   symbol: string;
   decimals: string;
   address: string;
   type: string;
}

interface TokenTransfer {
   from: TransactionAddress;
   to: TransactionAddress;
   token: TokenInfo;
   total: {
      value: string;
      decimals: string;
   };
   transaction_hash: string;
   type: string;
}

interface Transaction {
   timestamp: string;
   block_number: number;
   status: string;
   method: string;
   hash: string;
   from: TransactionAddress;
   to: TransactionAddress;
   value: string;
   gas_used: string;
   token_transfers?: TokenTransfer[];
}

export interface TransactionResponse {
   items: Transaction[];
   next_page_params?: {
      block_number: number;
      index: number;
      items_count: number;
   };
}
