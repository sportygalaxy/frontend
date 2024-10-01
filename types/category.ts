export type TCategory = {
  id: number;
  name: string;
  date: string;
  image: string;
};

export interface Category {
  id: string;
  name: string;
  description?: string; // Optional if available
  subcategories?: Subcategory[]; // Relation to subcategories
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}