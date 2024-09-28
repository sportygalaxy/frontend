export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  displayImage: string | null;
};

export type TProductQuery = {
  limit?: any;
  page?: any;
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

  createdAt?: string | null | undefined;
  updatedAt?: Date | null;
  filter?: {
    limit?: any;
    page?: any;
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
    createdAt?: string | null | undefined;
    updatedAt?: Date | null;
  };
};