import { ITherapist, ITherapistSchedulesOff } from "@/types/therapist.model";
import { FC } from "react";

export interface ITherapistScheduleOffDayScreenProps {
  count: number;
  content: ITherapistSchedulesOff[];
  therapist: ITherapist;
}

export type TTherapistScheduleOffDayScreenFC = FC<ITherapistScheduleOffDayScreenProps>;
