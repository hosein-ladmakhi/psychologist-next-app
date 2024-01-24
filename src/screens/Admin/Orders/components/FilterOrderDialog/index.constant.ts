import { TSelectOptions } from "@/types/base.model";
import { EOrderStatus } from "@/types/order.model";

export const FILTER_ORDER_DIALOG_SUBJECT = "FILTER_ORDER_DIALOG_SUBJECT";

export const ORDERS_STATUS_OPTIONS: TSelectOptions[] = [
  {
    key: EOrderStatus.Done,
    value: EOrderStatus.Done,
  },
  {
    key: EOrderStatus.Cancel,
    value: EOrderStatus.Cancel,
  },
  {
    key: EOrderStatus.Pending,
    value: EOrderStatus.Pending,
  },
];
