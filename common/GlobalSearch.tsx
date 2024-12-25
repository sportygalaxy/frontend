"use client";

import { useState, useCallback, FC } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { TProduct } from "@/types/product";

import { fetchProductsData } from "@/lib/apiProduct";
import { Search } from "@/components/search";
import ComponentStateWrapper from "./ComponentState/ComponentStateWrapper";
import { formatCurrency } from "@/utils/currencyUtils";

interface GlobalSearchProps {
  onClearClick?: () => void;
}
const GlobalSearch: FC<GlobalSearchProps> = ({ onClearClick }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the query update to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: () =>
      fetchProductsData(
        debouncedQuery ? { q: debouncedQuery, limit: 6 } : { limit: 6 }
      ),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products: TProduct[] = data?.data?.results || [];

  const handleSearchClick = () => {
    if (query.trim()) {
      router.push(`/products?q=${query.trim()}`);
    }
    setDebouncedQuery("");
  };

  const handleItemClick = (product: any) => {
    router.push(`/product/${product?.name}/${product?.id}`);
    setDebouncedQuery("");
  };

  return (
    <div className="relative z-50">
      <Search
        placeholder="Search for products..."
        value={query}
        onChange={handleChange}
        onSearchClick={handleSearchClick}
        onClearClick={onClearClick}
      />
      {debouncedQuery && (
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-60 overflow-y-auto z-50 p-6 scroll-m-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-700"
          style={{ maxHeight: "640px" }}
        >
          <ComponentStateWrapper
            isLoading={isLoading}
            error={error}
            data={products}
            emptyMessage="No results found."
          >
            {products?.map((product) => (
              <div
                key={product?.id}
                onClick={() => handleItemClick(product as any)}
                className="p-4 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center">
                  <img
                    src={product?.displayImage || "/placeholder.png"}
                    alt={product?.name}
                    className="w-12 h-12 rounded object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(product?.price || 0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ComponentStateWrapper>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
