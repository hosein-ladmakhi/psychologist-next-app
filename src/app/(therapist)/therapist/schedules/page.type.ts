import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface IScheduleSearchParams {
  day: number;
  location: number;
  type: string;
  time: string;
  room: number;
}

export interface ISchedulesPageProps extends INextPage<{}, IScheduleSearchParams> {}

export type TSchedulesPageFC = FC<ISchedulesPageProps>;
