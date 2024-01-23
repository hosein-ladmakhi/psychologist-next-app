import { IOrder } from "@/types/order.model";
import { FC } from "react";

export interface IDocumentationDialogProps {
  selectedOrder: IOrder;
  onClose: () => void;
}

export type TDocumentationDialogFC = FC<IDocumentationDialogProps>;
