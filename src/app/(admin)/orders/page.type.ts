import { INextPage } from "@/types/base.model";
import { EOrderStatus } from "@/types/order.model";
import { FC } from "react";

export interface IOrderSearchParamPage {
  page: string;
  status: EOrderStatus;
}

export interface IOrdersPageProps extends INextPage<{}, IOrderSearchParamPage> {}

export type TOrdersPageFC = FC<IOrdersPageProps>;
