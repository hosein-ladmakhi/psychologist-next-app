import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface IOrdersSearchParams {
  date?: string;
  day?: number;
  type?: string;
  patient?: number;
  time?: string;
  location?: string;
  category?: string;
  status?: string;
}

export interface IOrdersPageProps extends INextPage<{}, IOrdersSearchParams> {}

export type TOrdersPageFC = FC<IOrdersPageProps>;
