import { PAGINATION_DEFAULT } from "@/constants/appConstants";
import { TProductQuery } from "@/types/product";
import { substractDaysFromTodaysDate } from "@/utils/dateUtils";

export const PAGINATE_VIEW_OPTIONS = [
  { id: 1, name: "All", value: 500 },
  { id: 2, name: "20", value: 20 },
  { id: 3, name: "50", value: 50 },
  { id: 4, name: "100", value: 100 },
] as const;

export const SORT_OPTIONS = [
  { name: "None", value: undefined },
  { name: "Price: Low to High", value: "asc" },
  { name: "Price: High to Low", value: "desc" },
] as const;

export const DATE_OPTIONS = [
  { name: "None", value: undefined },
  { name: "Hot Arrivals", value: substractDaysFromTodaysDate(1) },
  { name: "Newly Arrivals", value: substractDaysFromTodaysDate(7) },
] as const;

export const COLOR_FILTERS = {
  id: "color",
  name: "Color",
  options: [
    { value: "9934e59d-6a92-4dd4-b00e-a49b719bc2c1", label: "Black" },
    { value: "3965c2b6-d7b0-4f50-82f3-6e9fc5cf9d56", label: "White" },
    { value: "76c3472b-2a68-482f-8366-9e36da2aaefb", label: "Grey" },
    { value: "123e4567-e89b-12d3-a456-426614174007", label: "Orange" },
    { value: "c587c285-193d-4e09-94d9-b3c3c9444213", label: "Cream" },
  ] as const,
};

export const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "33aae9f2-a25e-4be2-9781-6410bfee2c33", label: "S" },
    { value: "099c4ae0-c293-462a-9e0c-c784a1368c81", label: "M" },
    { value: "123e4567-e89b-12d3-a456-426614174005", label: "L" },
    { value: "123e4567-e89b-12d3-a456-426614174006", label: "Xl" },
    { value: "7e2fed6b-5d78-4a1d-b7f6-f6746ed46673", label: "2Xl" },
  ],
} as const;

export const TYPE_FILTERS = {
  id: "type",
  name: "Type",
  options: [
    { value: "123e4567-e89b-12d3-a456-426614174009", label: "Indoor" },
    { value: "123e4567-e89b-12d3-a456-426614174010", label: "Outdoor" },
  ],
} as const;

export const PRICE_FILTERS = {
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

export const CATEGORIES = [
  { id: "1", name: "All", selected: true, href: "#" },
  { id: "2", name: "Cardio Equipment", selected: false, href: "#" },
  { id: "3", name: "Yoga & Pilates Equipment", selected: false, href: "#" },
  { id: "4", name: "Sports Accessories", selected: false, href: "#" },
];

export const SUBCATEGORIES = [
  { id: "1", name: "All", selected: true, href: "#" },
  { id: "2", name: "Thread-mill", selected: false, href: "#" },
  { id: "3", name: "Rowing Machines", selected: false, href: "#" },
  { id: "4", name: "Stationary Bikes", selected: false, href: "#" },
];

export const DEFAULT_CUSTOM_PRICE = [0, 10000000] as [number, number];

export const isFilterEmpty = (filter: TProductQuery): boolean => {
  // Default state for comparison
  const defaultFilter = {
    color: [],
    size: [],
    type: [],
    price: {
      isCustom: false,
      range: DEFAULT_CUSTOM_PRICE,
    },
    q: undefined,
    subcategory: undefined,
    category: undefined,
    sort: undefined,
    page: PAGINATION_DEFAULT.page,
    limit: PAGINATION_DEFAULT.limit,
  };

  // Compare filter with default state
  return (
    filter?.color?.length === 0 &&
    filter?.size?.length === 0 &&
    filter?.type?.length === 0 &&
    filter?.price?.isCustom === defaultFilter?.price?.isCustom &&
    filter?.price?.range[0] === defaultFilter?.price?.range[0] &&
    filter?.price?.range[1] === defaultFilter?.price?.range[1] &&
    filter?.q === defaultFilter?.q &&
    filter?.subcategory === defaultFilter?.subcategory &&
    filter?.category === defaultFilter?.category &&
    filter?.sort === defaultFilter?.sort &&
    filter?.page === defaultFilter?.page &&
    filter?.limit === defaultFilter?.limit
  );
};