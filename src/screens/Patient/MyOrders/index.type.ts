import { IOrder } from "@/types/order.model";
import { FC } from "react";

interface IMyOrdersScreenProps {
  orders: IOrder[];
}

export type TMyOrdersScreenFC = FC<IMyOrdersScreenProps>;
