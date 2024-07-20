import { CATEGORIES } from "@/data";
import { TCategory } from "@/types/category";
import CategoriesCard from "./CategoriesCard";
import { FC } from "react";
import { DesktopSingleTitle } from "@/common/Title";

interface Props {}

const Categories: FC<Props> = () => {
  const categories: TCategory[] = CATEGORIES || [];

  return (
    <div className="w-full">
      <DesktopSingleTitle title="LIST PRODUCT." />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
        {categories?.map((cart: TCategory) => (
          <CategoriesCard key={cart.id} cart={cart} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
