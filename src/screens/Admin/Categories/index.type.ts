import { ICategory } from "@/types/category.model";
import { FC } from "react";

export interface ICategoriesScreenProps {
  data: ICategory[];
  totalPage: number;
  page: number;
  count: number
}

export type TCategoriesScreenFC = FC<ICategoriesScreenProps>;
