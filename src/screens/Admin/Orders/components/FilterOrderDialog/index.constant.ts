import { TSelectOptions } from "@/types/base.model";
import { EOrderStatus } from "@/types/order.model";

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
