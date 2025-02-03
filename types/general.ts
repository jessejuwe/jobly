export type Error = {
  message?: string | undefined;
  response?: { status?: number; data?: { message?: string | string[] } };
};

export type Payload = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  category?: string;
};

export type QueryProps = {
  enabled?: boolean;
  payload?: Payload;
  queryFn: (payload?: any) => Promise<any>;
  queryKey: string;
};

export type MutationProps = {
  mutationFn: (payload: object) => Promise<any>;
  queryKeys?: string[] | undefined;
};

export type ToastType = "info" | "success" | "loading" | "error";

export type FileInputValue = {
  file_name: string;
  file_size: string;
  url: string;
  date: string;
};

export type Response = {
  status: string;
  success: boolean;
  message: string;
  data: any;
  metadata: { total: number; pages: number; page: number; limit: number };
};
