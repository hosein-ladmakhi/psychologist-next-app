import { IOrder } from "@/types/order.model";
import { FC } from "react";

interface IOrderInformationCardProps {
  order: IOrder;
}

export type TOrderInformationCardFC = FC<IOrderInformationCardProps>;
