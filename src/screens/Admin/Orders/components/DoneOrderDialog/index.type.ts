import { IOrder } from "@/types/order.model";
import { FC } from "react";

export interface IDoneOrderDialogProps {
  selectedOrder: IOrder;
  onClose: () => void;
}

export type TDoneOrderDialogFC = FC<IDoneOrderDialogProps>;
