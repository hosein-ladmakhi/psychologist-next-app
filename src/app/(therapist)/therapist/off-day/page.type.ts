import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface IOffDayScheduleSearchParams {
  date: string;
  day: number;
}

export interface IOffDaySchedulePageProps extends INextPage<{}, IOffDayScheduleSearchParams> {}

export type TOffDaySchedulePageFC = FC<IOffDaySchedulePageProps>;
