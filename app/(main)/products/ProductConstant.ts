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

export const COLOR_FILTERS = {
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

export const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "123e4567-e89b-12d3-a456-426614174006", label: "S" },
    { value: "123e4567-e89b-12d3-a456-426614174005", label: "M" },
    { value: "L", label: "L" },
  ],
} as const;

export const TYPE_FILTERS = {
  id: "type",
  name: "Type",
  options: [
    { value: "123e4567-e89b-12d3-a456-426614174009", label: "Indoor" },
    { value: "123e4567-e89b-12d3-a456-426614174010", label: "Outdoor" },
    { value: "L", label: "L" },
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

export const SUBCATEGORIES = [
  { name: "Strength Training Equipment", selected: true, href: "#" },
  { name: "Cardio Equipment", selected: false, href: "#" },
  { name: "Yoga & Pilates Equipment", selected: false, href: "#" },
  { name: "Sports Accessories", selected: false, href: "#" },
  { name: "Functional Training Equipment", selected: false, href: "#" },
];

export const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];
