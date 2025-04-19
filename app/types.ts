type Result = "success" | "error";

export interface NetworkApiResponse {
   result: Result;
   block: number;
   gasPrice: string;
   message?: string;
}

export interface OverviewApiResponse {
   result: Result;
   balance: string;
   nonce: number;
   totalPortfolioValue: string;
   totalStakedValue: string;
   message?: string;
}
