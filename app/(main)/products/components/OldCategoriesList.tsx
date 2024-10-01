"use client";

import { fetchCategoriesData, fetchCategoryData } from "@/lib/apiCategory";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";

export default function OldCategoriesList() {
  const [categoryId, setCategoryId] = useState("");
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoriesData({}),
  });

  const {
    data: category,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategoryData(categoryId),
    enabled: !!categoryId, // Only fetch when categoryId is available
  });

  if (categoriesIsLoading) return <div>Loading...</div>;
  if (categoriesError) return <div>Error: {categoriesError.message}</div>;
  console.log("DATA ::", categories?.data);

  if (categoryIsLoading) return <div>Loading...</div>;
  if (categoryError) return <div>Error: {categoryError.message}</div>;
  console.log("DATA ::", category?.data);

  console.log("categoryId ::", categoryId);
  return (
    <>
      <ul>
        {categories?.data?.map((category: any) => (
          <li onClick={() => setCategoryId(category?.id)} key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>

      <ul>
        {category?.data?.subcategories?.map((cat: any) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </>
  );
}
