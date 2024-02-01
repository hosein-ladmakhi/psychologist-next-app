import { ITherapistSchedules } from "@/types/therapist.model";
import { FC } from "react";

export interface ISchedulesScreenProps {
  content: ITherapistSchedules[];
}

export type TSchedulesScreenFC = FC<ISchedulesScreenProps>;
