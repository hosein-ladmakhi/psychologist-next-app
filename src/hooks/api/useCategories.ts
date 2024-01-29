"use client";

import { getCategories } from "@/services/category.service";
import { ICategory } from "@/types/category.model";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

  useEffect(() => {
    setCategoriesLoading(true);
    getCategories({ limit: 10000 })
      .then((res) => setCategories(res.content))
      .finally(() => {
        setCategoriesLoading(false);
      });
  }, []);

  return { categories, categoriesLoading };
};
