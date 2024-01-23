import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface IOrderSearchParamPage {
  page: string;
}

export interface IOrdersPageProps extends INextPage<{}, IOrderSearchParamPage> {}

export type TOrdersPageFC = FC<IOrdersPageProps>;
