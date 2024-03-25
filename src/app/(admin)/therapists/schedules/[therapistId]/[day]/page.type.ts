import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface ITherapistScheduleByTherapistIdPageProps extends TNextPage {}

export type TNextPage = INextPage<ITherapistScheduleByTherapistIdPageParams>;

export interface ITherapistScheduleByTherapistIdPageParams {
  therapistId: number;
  day: number;
}

export type TTherapistScheduleByTherapistIdPageFC = FC<ITherapistScheduleByTherapistIdPageProps>;
