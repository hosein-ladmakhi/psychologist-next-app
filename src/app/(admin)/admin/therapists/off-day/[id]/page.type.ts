import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface ITherapistsOffDaySearchParams {
  page: number;
}

export interface ITherapistsOffDayParams {
  id: number;
}

export type TNextPage = INextPage<ITherapistsOffDayParams, ITherapistsOffDaySearchParams>;

export interface ITherapistsOffDayPageProps extends TNextPage {}

export type TTherapistsOffDayPageFC = FC<ITherapistsOffDayPageProps>;
