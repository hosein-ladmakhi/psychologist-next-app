import { IOrder } from "@/types/order.model";
import { FC } from "react";

interface IOrderDetailScreenProps {
  order: IOrder;
  latestPatientOrders: IOrder[];
}

export type TOrderDetailScreenFC = FC<IOrderDetailScreenProps>;
