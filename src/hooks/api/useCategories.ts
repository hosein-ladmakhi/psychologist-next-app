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
      .then((res) => {
        return setCategories(res?.content || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCategoriesLoading(false);
      });
  }, []);

  return { categories, categoriesLoading };
};
