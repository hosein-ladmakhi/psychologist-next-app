import { ICategory } from "@/types/category.model";
import { FC } from "react";

export interface ICategoriesScreenProps {
  data: ICategory[];
  total: number;
  page: number;
}

export type TCategoriesScreenFC = FC<ICategoriesScreenProps>;
