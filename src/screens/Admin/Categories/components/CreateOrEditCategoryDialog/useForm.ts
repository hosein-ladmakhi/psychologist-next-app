import { useForm } from "react-hook-form";
import { TCreateOrEditCategoryFormValidation } from "./index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditCategoryFormValidation } from "./index.constant";
import { useEffect } from "react";
import { ICategory } from "@/types/category.model";

export const useCreateOrEditCategoryForm = (selectedCategory?: ICategory) => {
  const { control, handleSubmit, setValue } = useForm<TCreateOrEditCategoryFormValidation>({
    resolver: zodResolver(createOrEditCategoryFormValidation),
    defaultValues: {
      enName: "",
      faName: "",
    },
    criteriaMode: "all",
    mode: "all",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (selectedCategory) {
      setValue("faName", selectedCategory?.faName);
      setValue("enName", selectedCategory?.enName);
    }

    return () => {
      setValue("faName", "");
      setValue("enName", "");
    };
  }, [selectedCategory]);

  return { control, handleSubmit, setValue };
};
