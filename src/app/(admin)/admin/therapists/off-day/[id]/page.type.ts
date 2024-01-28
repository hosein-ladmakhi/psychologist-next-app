import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface ITherapistsOffDaySearchParams {}

export interface ITherapistsOffDayParams {
  id: number;
}

export interface ITherapistsOffDayPageProps extends INextPage<ITherapistsOffDayParams, ITherapistsOffDaySearchParams> {}

export type TTherapistsOffDayPageFC = FC<ITherapistsOffDayPageProps>;
