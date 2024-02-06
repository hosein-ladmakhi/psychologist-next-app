import { INextPage } from "@/types/base.model";
import { EOrderStatus } from "@/types/order.model";
import { FC } from "react";

export interface IMyOrdersPageSearchParams {
  date: string;
  day: number;
  therapist: number;
  status: EOrderStatus;
}

interface IMyOrdersPageProps extends INextPage<{}, IMyOrdersPageSearchParams> {}

export type TMyOrdersPageFC = FC<IMyOrdersPageProps>;
