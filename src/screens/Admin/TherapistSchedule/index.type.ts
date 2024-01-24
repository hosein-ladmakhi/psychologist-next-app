import { ITherapist, ITherapistSchedules } from "@/types/therapist.model";
import { FC } from "react";

export interface ITherapistScheduleByTherapistIdScreenProps {
  schedules: ITherapistSchedules[];
  schedulesCount: number;
  therapist: ITherapist;
  selectedDay: number;
}

export type TTherapistScheduleByTherapistIdScreenFC = FC<ITherapistScheduleByTherapistIdScreenProps>;
