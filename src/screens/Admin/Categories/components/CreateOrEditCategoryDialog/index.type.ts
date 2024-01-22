import * as zod from "zod";
import { createOrEditCategoryFormValidation } from "./index.constant";
import { ICategory } from "@/types/category.model";
import { FC } from "react";

export interface ICreateOrEditCategoryDialogProps {
  onClose: () => void;
  selectedCategory?: ICategory;
}

export type TCreateOrEditCategoryFormValidation = zod.infer<typeof createOrEditCategoryFormValidation>;

export type TCreateOrEditCategoryDialogFC = FC<ICreateOrEditCategoryDialogProps>;
