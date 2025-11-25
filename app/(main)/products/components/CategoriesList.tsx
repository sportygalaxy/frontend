"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchCategoriesData, fetchCategoryData } from "@/lib/apiCategory";
import { Category, Subcategory } from "@/types/category"; // Import types for better typing
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface CategoriesListProps {
  filter: any;
  setFilter: any;
  updateUrlQuery: any;
  _debouncedSubmit: any;
}

export default function CategoriesList({
  filter,
  setFilter,
  updateUrlQuery,
  _debouncedSubmit,
}: CategoriesListProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null); // Use `null` as initial value for better type safety
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    null
  ); // For managing the active accordion

  // Fetch all categories
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoriesData({}),
  });

  // Fetch a single category's subcategories based on the selected category ID
  const {
    data: categoryy,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategoryData(categoryId as string),
    enabled: !!categoryId, // Only enable fetching when `categoryId` is set
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to prevent unnecessary refetches
  });

  // Loading and error states for categories
  if (categoriesIsLoading)
    return <div className="text-xs md:text-xs">Loading categories...</div>;
  if (categoriesError)
    return (
      <div className="text-xs md:text-xs">
        Error: {categoriesError?.message}
      </div>
    );

  const handleCategoryClick = (category: Category) => {
    setCategoryId(category?.id);
    setActiveAccordionId(
      activeAccordionId === category?.id ? null : category?.id
    );

    const updatedFilter = {
      ...filter,
      category: category?.id, // Update category filter
      subcategory: null, // Reset subcategory when a new category is selected
      page: 1, // Reset page to 1 when a category is selected
    };

    setFilter(updatedFilter);
    updateUrlQuery({ ...updatedFilter });
    _debouncedSubmit();
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    const updatedFilter = {
      ...filter,
      subcategory: subcategory?.id, // Set the subcategory in the filter
      page: 1, // Reset page to 1 when subcategory is selected
    };

    setFilter(updatedFilter);
    updateUrlQuery({ ...updatedFilter });
    _debouncedSubmit();
  };

  return (
    <div>
      <p className="uppercase font-normal text-sm">Category</p>

      {categories?.data?.map((category: Category) => (
        <Accordion
          key={category?.id}
          onClick={() => handleCategoryClick(category)}
          type="single" // Only one accordion open at a time
          className="animate-none"
          value={
            activeAccordionId === category?.id ? category?.id : (null as any)
          } // Control accordion's open state
        >
          <AccordionItem value={category?.id}>
            <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
              <p className="text-mobile-xl md:text-sm font-bold text-gray-900 uppercase text-left">
                {category?.name}
              </p>
            </AccordionTrigger>

            <AccordionContent className="pt-6 animate-none">
              {/* Only show subcategories if this category is selected */}
              {categoryId === category?.id && (
                <div className="accordion-content">
                  {categoryIsLoading && (
                    <div className="text-xs md:text-xs">
                      Loading subcategories...
                    </div>
                  )}
                  {categoryError && (
                    <div className="text-xs md:text-xs">
                      Error loading subcategories: {categoryError?.message}
                    </div>
                  )}

                  <ul className="space-y-2">
                    {categoryy?.data?.subcategories?.map(
                      (subcategory: Subcategory) => (
                        <li key={subcategory?.id}>
                          <button
                            className="hover:underline hover:text-black text-left focus:text-blue-700 focus:font-bold ring-offset-2 text-mobile-xl md:text-xs text-gray-600 capitalize"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering category click event
                              handleSubcategoryClick(subcategory);
                            }}
                          >
                            {subcategory?.name}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
