import { IOrder } from "@/types/order.model";
import { FC } from "react";

interface IOrdersScreenProps {
  data: IOrder[];
  todayOrders: IOrder[];
}

export type TOrdersScreenFC = FC<IOrdersScreenProps>;
