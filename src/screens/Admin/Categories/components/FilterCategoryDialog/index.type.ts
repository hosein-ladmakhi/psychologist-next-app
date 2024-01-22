import { ICategory } from "@/types/category.model";
import { FC } from "react";

export interface IFilterCategoryDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterCategoryFormValidation) => void;
}

export type TFilterCategoryFormValidation = Partial<Pick<ICategory, "enName" | "faName">>;

export type TFilterCategoryDialogFC = FC<IFilterCategoryDialogProps>;
