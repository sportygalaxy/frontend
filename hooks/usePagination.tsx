import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to handle pagination logic for API data fetching
 *
 * @param fetchData - Fetch function for data
 * @param pageSize - Number of items per page
 * @param queryKey - Query key to uniquely identify the query
 * @param enabled - Whether the query is enabled (optional)
 * @returns
 */
export const usePagination = <T,>(props: {
  queryKey: any[];
  queryFn: any;
  staleTime: any;
  setCurrentPage: any;
  enabled: boolean;
  params?: any;
  querys?: any;
}) => {
  const { queryKey, queryFn, staleTime, enabled, setCurrentPage } = props;

  // React Query to fetch data based on page number
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn,
    enabled,
    keepPreviousData: true,
    staleTime,
  });

  const totalPages = data ? data?.data?.pageCount : 1;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return {
    data,
    error,
    isLoading,
    totalPages,
    goToPage,
  };
};
