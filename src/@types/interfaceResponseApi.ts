export interface interResponceApi<T> {
  status: boolean;
  messages?: string;
  total?: number;
  data: T;
}
