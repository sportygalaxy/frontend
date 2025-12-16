"use client";

import BackButton from "@/common/BackButton";
import ComponentStateWrapper from "@/common/ComponentState/ComponentStateWrapper";
import AppLoader from "@/common/Loaders/AppLoader";
import { DesktopTitle } from "@/common/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { PAGINATION_DEFAULT } from "@/constants/appConstants";
import { fetchProductsData } from "@/lib/apiProduct";
import { cn } from "@/lib/utils";
import { TProductQuery } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "iconsax-react";
import debounce from "lodash.debounce";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // Import Next.js hooks
import { useCallback, useEffect, useState } from "react";
import ProductList from "../product/components/ProductList";
import CategoriesList from "./components/CategoriesList";
import {
  COLOR_FILTERS,
  DATE_OPTIONS,
  DEFAULT_CUSTOM_PRICE,
  isFilterEmpty,
  PAGINATE_VIEW_OPTIONS,
  PRICE_FILTERS,
  SIZE_FILTERS,
  SORT_OPTIONS,
  TYPE_FILTERS,
} from "./ProductConstant";

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilter = {
    color: searchParams.get("color")?.split(",") || [],
    size: searchParams.get("size")?.split(",") || [],
    type: searchParams.get("type")?.split(",") || [],

    price: {
      isCustom: searchParams.get("customPrice") === "true",
      range: searchParams.get("price")
        ? searchParams.get("price")?.split(",").map(Number)
        : DEFAULT_CUSTOM_PRICE,
    } as any,

    q: searchParams.get("q") || (undefined as any),

    subcategory: searchParams.get("subcategory") || (undefined as any),
    category: searchParams.get("category") || (undefined as any),

    sort: searchParams.get("sort") || (undefined as any),
    sortBy: searchParams.get("sortBy") || (undefined as any),
    createdAt: searchParams.get("createdAt") || (undefined as any),

    page: searchParams.get("page") || PAGINATION_DEFAULT.page,
    limit: searchParams.get("limit") || PAGINATION_DEFAULT.limit,
  };

  // Initialize filter state from URL query params
  const [filter, setFilter] = useState<TProductQuery>(defaultFilter);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", filter],
    queryFn: () =>
      fetchProductsData({
        ...filter,
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

    if (updatedFilter?.q) query.set("q", updatedFilter?.q);

    if (updatedFilter?.subcategory)
      query.set("subcategory", updatedFilter?.subcategory);
    if (updatedFilter?.category) query.set("category", updatedFilter?.category);

    if (updatedFilter?.sort) query.set("sort", updatedFilter?.sort);
    if (updatedFilter?.sortBy) query.set("sortBy", updatedFilter?.sortBy);
    if (updatedFilter?.createdAt)
      query.set("createdAt", updatedFilter?.createdAt);

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
    category: keyof Omit<
      typeof filter,
      "price" | "sort" | "sortBy" | "createdAt"
    >;
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

      q: searchParams.get("q") || undefined,

      subcategory: searchParams.get("subcategory") || undefined,
      category: searchParams.get("category") || undefined,

      sort: searchParams.get("sort") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      createdAt: searchParams.get("createdAt") || undefined,

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

  const currentPage = data?.data?.currentPage || 0;
  const totalPages = data?.data?.pageCount || 0;

  // console.log("general Filter :::::", filter);

  const CustomLoading = () => <AppLoader />;
  const CustomError = () => <div>An Error Occured...</div>;
  const CustomEmpty = () => <div>No result found...</div>;

  return (
    <div className="wrapper">
      <div className="relative">
        <BackButton className="hidden sm:inline-flex absolute left-0 top-4 sm:top-6 md:top-8 lg:top-10" />

        <div className="flex flex-col-reverse items-center md:items-baseline gap-4 sm:gap-2">
          <DesktopTitle title="All products" />

          <div className="flex items-center gap-6 ml-auto sm:pt-4">
            <BackButton className="m-0 p-0 sm:hidden absolute left-0 -top-1.5" />
            {/* SORT */}
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
                      className={cn(
                        "text-left w-full block px-4 py-2 text-sm",
                        {
                          "text-gray-900 bg-gray-100":
                            option.value === filter.sort,
                          "text-gray-500": option.value !== filter.sort,
                        }
                      )}
                      onClick={() => {
                        const updatedFilter = {
                          ...filter,
                          sort: option.value,
                          sortBy: "price",
                          page: 1, // Reset to first page when limit changes
                        };

                        setFilter(updatedFilter);

                        updateUrlQuery({
                          ...updatedFilter,
                        });

                        _debouncedSubmit();
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button className="-m-2 ml-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                <Filter color="#000" className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="group inline-flex justify-center text-mobile-2xl md:text-xl font-bold text-gray-700 hover:text-gray-900">
                  Recent
                  <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {DATE_OPTIONS.map((option) => (
                    <button
                      key={option.name}
                      className={cn(
                        "text-left w-full block px-4 py-2 text-sm",
                        {
                          "text-gray-900 bg-gray-100":
                            option.value === filter.createdAt,
                          "text-gray-500": option.value !== filter.createdAt,
                        }
                      )}
                      onClick={() => {
                        const updatedFilter = {
                          ...filter,
                          // sort: option.value,
                          // sortBy: "createdAt",
                          createdAt: option.value,
                          page: 1, // Reset to first page when limit changes
                        };

                        setFilter(updatedFilter);

                        updateUrlQuery({
                          ...updatedFilter,
                        });

                        _debouncedSubmit();
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button className="-m-2 ml-1 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                <Filter color="#000" className="h-4 w-4" />
              </button>
            </div>

            {/* CLEAR */}
            {isFilterEmpty(filter) ? null : (
              <Button
                variant="link"
                onClick={() => {
                  const defaultFilter = {};
                  setFilter(defaultFilter);
                  updateUrlQuery(defaultFilter);
                  _debouncedSubmit();
                }}
                className="mt-4 text-mobile-xl md:text-sm font-medium text-red-600 m-0 p-0"
              >
                Clear filter
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <div className="block space-y-4">
          <CategoriesList
            filter={filter}
            setFilter={setFilter}
            updateUrlQuery={updateUrlQuery}
            _debouncedSubmit={_debouncedSubmit}
          />

          {/* ACCODIAN */}
          <div>
            <p className="uppercase font-normal text-sm">Filter</p>
            <Accordion type="multiple" className="animate-none">
              {/* Color filter */}
              <AccordionItem value="color">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="text-mobile-xl md:text-sm font-bold text-gray-900">
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
                          className="ml-3 text-mobile-xl md:text-xs text-gray-600"
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
                  <span className="text-mobile-xl md:text-sm font-bold  text-gray-900">
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
                          className="ml-3 text-mobile-xl md:text-xs text-gray-600"
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
                  <span className="text-mobile-xl md:text-sm font-bold  text-gray-900">
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
                          className="ml-3 text-mobile-xl md:text-xs text-gray-600"
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
                  <span className="text-mobile-xl md:text-sm font-bold text-gray-900">
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
                            const updatedFilter = {
                              ...filter,
                              price: {
                                isCustom: false,
                                range: [...(option.value as [number, number])],
                              },
                              page: 1, // Reset page to 1 when filters are updated
                            };

                            setFilter(updatedFilter as any);

                            // Sync the new price filter with the URL
                            updateUrlQuery(updatedFilter as any);

                            // Debounced submit to refetch data with new filters
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
                          className="ml-3 text-mobile-xl md:text-xs text-gray-600"
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
                            const updatedFilter = {
                              ...filter,
                              price: {
                                isCustom: true,
                                range: [0, 100],
                              },
                              page: 1, // Reset page to 1 when filters are updated
                            };

                            setFilter(updatedFilter as any);

                            // Sync custom price filter with the URL
                            updateUrlQuery(updatedFilter as any);

                            // Debounced submit to refetch data with new filters
                            _debouncedSubmit();
                          }}
                          checked={filter?.price?.isCustom}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`price-${PRICE_FILTERS.options.length}`}
                          className="ml-3 text-mobile-xl md:text-xs text-gray-600"
                        >
                          Custom
                        </label>
                      </div>

                      <div className="flex flex-col md:justify-between mt-4">
                        <p className="font-normal text-mobile-xl md:text-xs">
                          Price range
                        </p>

                        <div className="text-mobile-xl md:text-sm">
                          {filter?.price?.isCustom
                            ? minPrice?.toFixed(0)
                            : filter?.price?.range[0].toFixed(0)}{" "}
                          ₦ -{" "}
                          {filter?.price?.isCustom
                            ? maxPrice?.toFixed(0)
                            : filter?.price?.range[1].toFixed(0)}{" "}
                          ₦
                        </div>
                      </div>

                      <Slider
                        className={cn({
                          "opacity-50": !filter?.price?.isCustom,
                        })}
                        disabled={!filter?.price?.isCustom}
                        onValueChange={(range) => {
                          const [newMin, newMax] = range;

                          const updatedFilter = {
                            ...filter,
                            price: {
                              isCustom: true,
                              range: [newMin, newMax] as [number, number],
                            },
                            page: 1, // Reset page to 1 when filters are updated
                          };

                          setFilter(updatedFilter);

                          // Sync the custom price range with the URL
                          updateUrlQuery(updatedFilter);

                          // Debounced submit to refetch data with new filters
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
          </div>
        </div>

        <section className="flex flex-col w-full">
          <ComponentStateWrapper
            isLoading={isLoading}
            error={error}
            data={data}
            refetch={refetch}
            emptyMessage="No items found!"
            CustomLoadingComponentProps={<CustomLoading />}
            CustomErrorComponentProps={<CustomError />}
            CustomEmptyComponentProps={<CustomEmpty />}
          >
            <ProductList isolated={false} productData={data?.data?.results} />
          </ComponentStateWrapper>

          {/* PAGINATION */}
          <section className="flex items-center justify-between mt-10">
            <Button
              onClick={() => {
                const newPage = Math.max(1, parseInt(filter.page) - 1); // Decrease page but not below 1
                const updatedFilter = { ...filter, page: String(newPage) };
                setFilter(updatedFilter);
                updateUrlQuery(updatedFilter); // Sync to URL
                _debouncedSubmit();
              }}
              disabled={currentPage <= 1}
            >
              Prev
            </Button>

            <section className="flex items-center justify-center gap-4">
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <div className="hidden sm:flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="group inline-flex justify-center text-mobile-2xl md:text-xl font-bold text-gray-700 hover:text-gray-900">
                    Show Product
                    <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {PAGINATE_VIEW_OPTIONS.map((option) => (
                      <button
                        key={option.name}
                        className={cn(
                          "text-left w-full block px-4 py-2 text-sm",
                          {
                            "text-gray-900 bg-gray-100":
                              option.value === filter.limit,
                            "text-gray-500": option.value !== filter.limit,
                          }
                        )}
                        onClick={() => {
                          // Update the filter limit and sync with URL query
                          const updatedFilter = {
                            ...filter,
                            limit: option.value,
                            page: 1, // Reset to first page when limit changes
                          };

                          setFilter(updatedFilter);

                          // Sync the new limit with the URL
                          updateUrlQuery({
                            ...updatedFilter,
                          });

                          // Debounced submit to fetch new data
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
            </section>

            <Button
              onClick={() => {
                const newPage = Math.min(totalPages, parseInt(filter.page) + 1); // Increase page but not above totalPages
                const updatedFilter = { ...filter, page: String(newPage) };
                setFilter(updatedFilter);
                updateUrlQuery(updatedFilter); // Sync to URL
                _debouncedSubmit();
              }}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </section>
        </section>
      </div>
    </div>
  );
}
