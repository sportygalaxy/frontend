"use client";
import { DesktopTitle } from "@/common/Title";
import ProductList from "../product/components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsData } from "@/lib/apiProduct";
import { useCallback, useEffect, useState } from "react";
import { TProductQuery } from "@/types/product";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js hooks
import { Filter } from "iconsax-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  DEFAULT_CUSTOM_PRICE,
  SORT_OPTIONS,
  SUBCATEGORIES,
  COLOR_FILTERS,
  SIZE_FILTERS,
  TYPE_FILTERS,
  PRICE_FILTERS,
} from "./ProductConstant";
import { PAGINATION_DEFAULT } from "@/constants/appConstants";
import { Button } from "@/components/ui/button";

type QueryParams = {
  page?: string; // using string since router query params are strings
  limit?: string; // using string since router query params are strings
};

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filter state from URL query params
  const [filter, setFilter] = useState<TProductQuery>({
    color: searchParams.get("color")?.split(",") || [],
    size: searchParams.get("size")?.split(",") || [],
    type: searchParams.get("type")?.split(",") || [],
    price: {
      isCustom: searchParams.get("customPrice") === "true",
      range: searchParams.get("price")
        ? searchParams.get("price")?.split(",").map(Number)
        : DEFAULT_CUSTOM_PRICE,
    } as any,
    sort: searchParams.get("sort") || (undefined as any),
    page: searchParams.get("page") || PAGINATION_DEFAULT.page,
    limit: searchParams.get("limit") || PAGINATION_DEFAULT.limit,
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", filter],
    queryFn: () =>
      fetchProductsData({
        page: String(1),
        limit: String(3),
        filter,
      }),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Function to update the URL query string with the current filter state
  const updateUrlQuery = (updatedFilter: TProductQuery) => {
    const query = new URLSearchParams();

    if (updatedFilter?.color?.length)
      query.set("color", updatedFilter.color.join(","));
    if (updatedFilter?.size?.length)
      query.set("size", updatedFilter?.size.join(","));
    if (updatedFilter?.type?.length)
      query.set("type", updatedFilter?.type.join(","));
    if (updatedFilter?.price)
      query.set("price", updatedFilter?.price?.range.join(","));
    if (updatedFilter?.price?.isCustom) query.set("customPrice", "true");
    if (updatedFilter?.sort) query.set("sort", updatedFilter?.sort);

    // Pagination
    if (updatedFilter?.page) query.set("page", updatedFilter?.page);
    if (updatedFilter?.limit) query.set("limit", updatedFilter?.limit);

    router.replace(`?${query.toString()}`); // Update the URL without refreshing the page
  };

  // Handle filter updates
  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">;
    value: string;
  }) => {
    if (Array.isArray(filter[category])) {
      const isFilterApplied = filter[category].includes(value as never);

      const updatedFilter = {
        ...filter,
        [category]: isFilterApplied
          ? (filter[category] as string[]).filter((v) => v !== value)
          : [...(filter[category] as string[]), value],
      };
      setFilter(updatedFilter);
      updateUrlQuery(updatedFilter); // Sync filters to the URL
      _debouncedSubmit();
    }
  };

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, [filter]);

  // Sync URL params to filter state when the component mounts
  useEffect(() => {
    const initialFilter = {
      color: searchParams.get("color")?.split(",") || [],
      size: searchParams.get("size")?.split(",") || [],
      type: searchParams.get("type")?.split(",") || [],
      price: {
        isCustom: searchParams.get("customPrice") === "true",
        range: searchParams.get("price")
          ? searchParams.get("price")?.split(",").map(Number)
          : DEFAULT_CUSTOM_PRICE,
      },
      sort: searchParams.get("sort") || undefined,

      // pagination
      page: searchParams.get("page") || PAGINATION_DEFAULT.page,
      limit: searchParams.get("limit") || PAGINATION_DEFAULT.limit,
    };
    setFilter(initialFilter as any);
  }, [searchParams]);

  const minPrice: number = Math.min(
    filter?.price?.range[0] || 0,
    filter?.price?.range[1] || 0
  );
  const maxPrice: number = Math.max(
    filter?.price?.range[0] || 0,
    filter?.price?.range[1] || 0
  );

  console.log("FILTER ::", filter);

  return (
    <div className="wrapper">
      <div className="flex items-baseline gap-5">
        <DesktopTitle title="All products" />
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-mobile-2xl md:text-xl font-bold text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn("text-left w-full block px-4 py-2 text-sm", {
                    "text-gray-900 bg-gray-100": option.value === filter.sort,
                    "text-gray-500": option.value !== filter.sort,
                  })}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));

                    _debouncedSubmit();
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <div className="block">
          <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
            {SUBCATEGORIES.map((category) => (
              <li key={category.name}>
                <button
                  disabled={!category.selected}
                  className="disabled:cursor-not-allowed disabled:opacity-60 text-mobile-2xl md:text-xl font-bold text-left"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>

          {/* ACCODIAN */}
          <Accordion type="multiple" className="animate-none">
            {/* Color filter */}
            <AccordionItem value="color">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="text-mobile-2xl md:text-xl font-bold text-gray-900">
                  Color
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {COLOR_FILTERS.options.map((option, optionIdx) => (
                    <li key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`color-${optionIdx}`}
                        onChange={() => {
                          applyArrayFilter({
                            category: "color",
                            value: option.value,
                          });
                        }}
                        checked={filter?.color?.includes(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`color-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Size filter */}
            <AccordionItem value="size">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="text-mobile-2xl md:text-xl font-bold  text-gray-900">
                  Size
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {SIZE_FILTERS.options.map((option, optionIdx) => (
                    <li key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`size-${optionIdx}`}
                        onChange={() => {
                          applyArrayFilter({
                            category: "size",
                            value: option.value,
                          });
                        }}
                        checked={filter?.size?.includes(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`size-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Type filter */}
            <AccordionItem value="type">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="text-mobile-2xl md:text-xl font-bold  text-gray-900">
                  Type
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {TYPE_FILTERS.options.map((option, optionIdx) => (
                    <li key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`type-${optionIdx}`}
                        onChange={() => {
                          applyArrayFilter({
                            category: "type",
                            value: option.value,
                          });
                        }}
                        checked={filter?.type?.includes(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`type-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Price filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="text-mobile-2xl md:text-xl font-bold text-gray-900">
                  Price
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {PRICE_FILTERS.options.map((option, optionIdx) => (
                    <li key={option.label} className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${optionIdx}`}
                        onChange={() => {
                          setFilter((prev) => ({
                            ...prev,
                            price: {
                              isCustom: false,
                              range: [...(option.value as [number, number])],
                            },
                          }));

                          _debouncedSubmit();
                        }}
                        checked={
                          !filter?.price?.isCustom &&
                          filter?.price?.range[0] === option.value[0] &&
                          filter?.price?.range[1] === option.value[1]
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`price-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                  <li className="flex justify-center flex-col gap-2">
                    <div>
                      <input
                        type="radio"
                        id={`price-${PRICE_FILTERS.options.length}`}
                        onChange={() => {
                          setFilter((prev) => ({
                            ...prev,
                            price: {
                              isCustom: true,
                              range: [0, 100],
                            },
                          }));

                          _debouncedSubmit();
                        }}
                        checked={filter?.price?.isCustom}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`price-${PRICE_FILTERS.options.length}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        Custom
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <p className="font-medium">Price</p>
                      <div>
                        {filter?.price?.isCustom
                          ? minPrice?.toFixed(0)
                          : filter?.price?.range[0].toFixed(0)}{" "}
                        € -{" "}
                        {filter?.price?.isCustom
                          ? maxPrice?.toFixed(0)
                          : filter?.price?.range[1].toFixed(0)}{" "}
                        €
                      </div>
                    </div>

                    <Slider
                      className={cn({
                        "opacity-50": !filter?.price?.isCustom,
                      })}
                      disabled={!filter?.price?.isCustom}
                      onValueChange={(range) => {
                        const [newMin, newMax] = range;

                        setFilter((prev) => ({
                          ...prev,
                          price: {
                            isCustom: true,
                            range: [newMin, newMax] as [number, number],
                          },
                        }));

                        _debouncedSubmit();
                      }}
                      value={
                        filter?.price?.isCustom
                          ? filter?.price?.range
                          : DEFAULT_CUSTOM_PRICE
                      }
                      min={DEFAULT_CUSTOM_PRICE[0]}
                      defaultValue={DEFAULT_CUSTOM_PRICE}
                      max={DEFAULT_CUSTOM_PRICE[1]}
                      step={5}
                    />
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <section className="flex items-center justify-between mt-10">
            <Button
              onClick={() => {
                setFilter((prev) => ({
                  ...prev,
                  ...(filter?.page && { page: Number(filter?.page) - 1 }),
                }));

                _debouncedSubmit();
              }}
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                setFilter((prev) => ({
                  ...prev,
                  ...(filter?.page && { page: Number(filter?.page) + 1 }),
                }));

                _debouncedSubmit();
              }}
            >
              Next
            </Button>
          </section>
        </div>

        <ProductList productData={data?.data?.results} />
      </div>
    </div>
  );
}
