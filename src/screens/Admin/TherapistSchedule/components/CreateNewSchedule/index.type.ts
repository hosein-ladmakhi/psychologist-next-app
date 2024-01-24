import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface ITCreateNewScheduleProps {
  day: number;
  dayText: string;
  therapist?: ITherapist;
}

export type TCreateNewScheduleFC = FC<ITCreateNewScheduleProps>;
