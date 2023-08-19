export interface interResponceApi<T extends any> {
    status: boolean;
    messages?: string;
    total?: number;
    data: T;
}