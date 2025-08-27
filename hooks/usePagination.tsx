import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { useState, useCallback } from "react";

interface UsePaginationProps<TParams, TData> {
  queryKey: any[];
  queryFn: (
    params: { page: number; limit: number } & TParams
  ) => Promise<TData>;
  pageSize?: number;
  enabled?: boolean;
  staleTime?: number;
  initialPage?: number;
  params?: TParams;
}

export interface UsePaginationReturn<TData> {
  data: TData | undefined;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

/**
 * Generic pagination hook for any API list
 */
export const usePagination = <TParams = any, TData = any>({
  queryKey,
  queryFn,
  pageSize = 10,
  enabled = true,
  staleTime = 5 * 60 * 1000,
  initialPage = 1,
  params,
}: UsePaginationProps<TParams, TData>): UsePaginationReturn<TData> => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, error, refetch, isLoading } = useQuery({
    queryKey: [...queryKey, currentPage, params],
    queryFn: () =>
      queryFn({ page: currentPage, limit: pageSize, ...(params || {}) } as {
        page: number;
        limit: number;
      } & TParams),
    placeholderData: (prev) => prev,
    enabled,
    staleTime,
    retry: 2,
  });

  const totalPages = (data as any)?.data?.pageCount || 1;

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages]
  );

  const nextPage = useCallback(
    () => goToPage(currentPage + 1),
    [currentPage, goToPage]
  );
  const prevPage = useCallback(
    () => goToPage(currentPage - 1),
    [currentPage, goToPage]
  );

  return {
    data,
    error,
    refetch,
    isLoading,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  };
};
