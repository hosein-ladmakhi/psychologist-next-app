import { IDatasourcePageRes } from "@/types/base.model";
import { IOrder } from "@/types/order.model";
import { FC } from "react";

export interface IOrdersScreenProps {
  data: IOrder[];
  count: number;
  page: number;
}

export type TOrdersScreenFC = FC<IOrdersScreenProps>;

export type TOrdersPageRes = IDatasourcePageRes<IOrder>;
