import { IOrder } from "@/types/order.model";
import { FC } from "react";

interface IRecentOrdersCardProps {
  latestPatientOrders: IOrder[];
}

export type TRecentOrdersCardFC = FC<IRecentOrdersCardProps>;
