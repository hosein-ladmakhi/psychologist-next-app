import { INextPage } from "@/types/base.model";
import { FC } from "react";

interface IOrderDetailParam {
  id: number;
}

interface IOrderDetailPageProps extends INextPage<IOrderDetailParam> {}

export type TOrderDetailPageFC = FC<IOrderDetailPageProps>;
