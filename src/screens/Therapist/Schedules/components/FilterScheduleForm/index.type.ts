import { ITherapistSchedules } from "@/types/therapist.model";
import { FC } from "react";

interface IFilterScheduleForm {
  schedules: ITherapistSchedules[];
}

export type TFilterScheduleFormFC = FC<IFilterScheduleForm>;
