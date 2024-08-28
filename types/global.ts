type ServerResponse<T> = Partial<{
  message: string;
  data: T;
  success: boolean;
}>;

