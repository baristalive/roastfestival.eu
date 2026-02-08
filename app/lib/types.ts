// Error Handling
export type ErrorType = "toast" | "inline";

export interface AppError {
  message: string;
  timestamp: number;
  type: ErrorType;
}
