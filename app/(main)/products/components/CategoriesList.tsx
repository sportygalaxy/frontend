"use client";

import { fetchCategoriesData, fetchCategoryData } from "@/lib/apiCategory";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Category, Subcategory } from "@/types/category"; // Import types for better typing

export default function CategoriesList() {
  const [categoryId, setCategoryId] = useState<string | null>(null); // Use `null` as initial value for better type safety

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
  if (categoriesIsLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error: {categoriesError.message}</div>;

  return (
    <>
      <ul className="accordion">
        {categories?.data?.map((category: Category) => (
          <li key={category.id}>
            {/* Accordion item */}
            <button
              className="accordion-header"
              onClick={() => setCategoryId(category.id)}
            >
              {category.name}
            </button>

            {/* Only show subcategories if this category is selected */}
            {categoryId === category.id && (
              <div className="accordion-content">
                {categoryIsLoading && <div>Loading subcategories...</div>}
                {categoryError && (
                  <div>
                    Error loading subcategories: {categoryError.message}
                  </div>
                )}

                <ul>
                  {categoryy?.data?.subcategories?.map(
                    (subcategory: Subcategory) => (
                      <li key={subcategory.id}>{subcategory.name}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .accordion-header {
          cursor: pointer;
          font-weight: bold;
        }

        .accordion-content {
          margin-top: 10px;
          padding-left: 20px;
        }
      `}</style>
    </>
  );
}
