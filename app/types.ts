type Result = "success" | "error";

export interface NetworkApiResponse {
   result: Result;
   block: number;
   gasPrice: string;
   message?: string;
}
