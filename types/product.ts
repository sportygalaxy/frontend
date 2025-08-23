export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  salesPrice?: string;
  displayImage: string | null;
};

export type TProductQuery = {
  instance?: any; // optional for reactQuery
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
    instance?: any; // optional for reactQuery
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

export interface ProductMedia {
  images?: string[];
  type: "image" | "video";
  displayImage: string;
  links?: {
    introVideo?: string;
    completeVideo?: string;
  };
}

export interface ProductSpecification {
  Key: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salesPrice?: number;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  specification: ProductSpecification[];
  keyattribute: ProductSpecification[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  displayImage: string;
  sizes: any[];
  colors: any[];
  medias: ProductMedia[];
}