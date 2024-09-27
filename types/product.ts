export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  displayImage: string | null;
};

export type TProductQuery = {
  limit?: string;
  page?: string;
  q?: string;
  category?: string;
  subcategory?: string;
  stock?: string;
  color?: string[];
  type?: string[];
  size?: string[];
  minPrice?: string;
  maxPrice?: string;
  price?: {
    isCustom: boolean;
    range: [number, number];
  };
  sort?: undefined | "asc" | "desc";
  createdAt?: Date | null;
  updatedAt?: Date | null;
  filter?: {
    category?: string;
    subcategory?: string;
    stock?: string;
    color?: string[];
    type?: string[];
    size?: string[];
    minPrice?: string;
    maxPrice?: string;
    price?: {
      isCustom?: boolean;
      range?: [number, number];
    };
    sort?: undefined | "asc" | "desc";
    createdAt?: Date | null;
    updatedAt?: Date | null;
  };
};