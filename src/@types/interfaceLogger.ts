export interface interDecoratorLogger {
  ip: string;
  origin: string;
  path: string;
  method: string;
  params: object;
  other?: any;
}

export interface interLogger<T extends object | unknown> {
  type?: string;
  origin: interDecoratorLogger;
  data: T;
  user?: string | null;
}
