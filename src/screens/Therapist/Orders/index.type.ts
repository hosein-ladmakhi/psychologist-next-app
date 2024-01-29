import { IOrder } from "@/types/order.model";
import { FC } from "react";

interface IOrdersScreenProps {
  data: IOrder[];
  count: number;
  totalPageCount: number;
}

export type TOrdersScreenFC = FC<IOrdersScreenProps>;
