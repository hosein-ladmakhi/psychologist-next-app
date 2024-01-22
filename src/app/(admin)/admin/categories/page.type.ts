import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface ICategoriesSearchParams {
  page: string;
  enName?: string;
  faName?: string;
}

export type TCategoriesPageFC = FC<INextPage<{}, ICategoriesSearchParams>>;
