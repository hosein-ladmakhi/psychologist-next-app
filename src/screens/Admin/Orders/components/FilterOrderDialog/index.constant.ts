import { TSelectOptions } from "@/types/base.model";
import { EOrderStatus } from "@/types/order.model";
import { getOrderStatusEnum } from "@/utils/getEnumTransformer";

export const ORDERS_STATUS_OPTIONS: TSelectOptions[] = [
  {
    key: getOrderStatusEnum(EOrderStatus.Done),
    value: EOrderStatus.Done,
  },
  {
    key: getOrderStatusEnum(EOrderStatus.Cancel),
    value: EOrderStatus.Cancel,
  },
  {
    key: getOrderStatusEnum(EOrderStatus.Pending),
    value: EOrderStatus.Pending,
  },
];
