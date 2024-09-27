"use client";
import { DesktopTitle } from "@/common/Title";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductList from "../product/components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsData } from "@/lib/apiProduct";
import { useCallback, useState } from "react";
import { TProductQuery } from "@/types/product";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
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

const SORT_OPTIONS = [
  { name: "None", value: undefined },
  { name: "Price: Low to High", value: "asc" },
  { name: "Price: High to Low", value: "desc" },
] as const;

const COLOR_FILTERS = {
  id: "color",
  name: "Color",
  options: [
    { value: "123e4567-e89b-12d3-a456-426614174007", label: "White" },
    { value: "123e4567-e89b-12d3-a456-426614174008", label: "Beige" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
  ] as const,
};

const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "123e4567-e89b-12d3-a456-426614174006", label: "S" },
    { value: "123e4567-e89b-12d3-a456-426614174005", label: "M" },
    { value: "L", label: "L" },
  ],
} as const;

const TYPE_FILTERS = {
  id: "type",
  name: "Type",
  options: [
    { value: "123e4567-e89b-12d3-a456-426614174009", label: "Indoor" },
    { value: "123e4567-e89b-12d3-a456-426614174010", label: "Outdoor" },
    { value: "L", label: "L" },
  ],
} as const;

const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 100], label: "Any price" },
    {
      value: [0, 20],
      label: "Under 20€",
    },
    {
      value: [0, 40],
      label: "Under 40€",
    },
    // custom option defined in JSX
  ],
} as const;

const SUBCATEGORIES = [
  { name: "Strength Training Equipment", selected: true, href: "#" },
  { name: "Hoodies", selected: false, href: "#" },
  { name: "Sweatshirts", selected: false, href: "#" },
  { name: "Accessories", selected: false, href: "#" },
];

const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];

interface ProductsProps {}
export default function Products({}: ProductsProps) {
  const [filter, setFilter] = useState<TProductQuery>({
    color: [],
    size: [],
    type: [],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    sort: undefined,
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", {}],
    queryFn: () =>
      fetchProductsData({
        page: String(1),
        limit: String(3),
        filter: {
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.color && { color: filter.color }),
          ...(filter.type && { type: filter.type }),
          ...(filter.price && {
            price: {
              range: filter.price.range,
            },
          }),
          ...(filter.size && { size: filter.size }),
        },
      }),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, []);

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">;
    value: string;
  }) => {
    // Check if the current filter value is an array before using the includes method
    if (Array.isArray(filter[category])) {
      const isFilterApplied = filter[category].includes(value as never);

      if (isFilterApplied) {
        setFilter((prev) => ({
          ...prev,
          [category]: (prev[category] as string[]).filter((v) => v !== value),
        }));
      } else {
        setFilter((prev) => ({
          ...prev,
          [category]: [...(prev[category] as string[]), value],
        }));
      }
      _debouncedSubmit();
    }
  };

  const minPrice: number = Math.min(
    filter?.price?.range[0] || 0,
    filter?.price?.range[1] || 0
  );
  const maxPrice: number = Math.max(
    filter?.price?.range[0] || 0,
    filter?.price?.range[1] || 0
  );

  console.log("filter ::", filter);

  return (
    <div className="wrapper">
      <DesktopTitle title="All products" />

      <div className="flex gap-4 mt-10">
        <div>
          <p>Gym equipments</p>
          <Select>
            <SelectTrigger className="text-mobile-xl md:text-xl font-bold flex flex-1 px-4 rounded-3xl bg-red-100">
              <SelectValue placeholder="Products" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-dark">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="light">Out-door</SelectItem>
              <SelectItem value="dark">In-door</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* SORT */}
        <div>
          <p>Sports equipments</p>
          <Select>
            <SelectTrigger className="text-mobile-xl md:text-xl font-bold flex flex-1 px-4 rounded-3xl bg-red-100">
              <SelectValue placeholder="Products" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-dark">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="light">Out-door</SelectItem>
              <SelectItem value="dark">In-door</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
          {SUBCATEGORIES.map((category) => (
            <li key={category.name}>
              <button
                disabled={!category.selected}
                className="disabled:cursor-not-allowed disabled:opacity-60"
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
              <span className="font-medium text-gray-900">Color</span>
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
              <span className="font-medium text-gray-900">Size</span>
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
              <span className="font-medium text-gray-900">Type</span>
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
              <span className="font-medium text-gray-900">Price</span>
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
                            range: [...option.value],
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
                          range: [newMin, newMax],
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

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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

      <ProductList productData={data?.data?.results} />
    </div>
  );
}
