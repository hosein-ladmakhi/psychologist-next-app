import { EOrderStatus } from "@/types/order.model";
import { FC } from "react";

export interface IFilterOrderDialogProps {
  onClose: () => void;
  onChangeFilter: (filterObject: IFilterOrderFormValidation) => void;
}

export type TFilterOrderDialogFC = FC<IFilterOrderDialogProps>;

export interface IFilterOrderFormValidation {
  status: EOrderStatus;
}
