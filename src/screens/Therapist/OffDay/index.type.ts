import { ITherapistSchedulesOff } from "@/types/therapist.model";
import { FC } from "react";

interface IOffDayScheduleScreenProps {
  content: ITherapistSchedulesOff[];
}

export type TOffDayScheduleScreenFC = FC<IOffDayScheduleScreenProps>;
