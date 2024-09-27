type ServerResponse<T> = Partial<{
  message: string;
  data: T;
  success: boolean;
}>;

type PaginatedServerResponse<T> = Partial<{
  message: string;
  data: {
    currentPage: number;
    pageCount: number;
    count: number;
    results: Array<T>;
  };
  success: boolean;
}>;
