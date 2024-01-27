import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";
import * as zod from "zod";
import { createNewScheduleFormValidation } from "./index.constant";

export interface ITCreateNewScheduleProps {
  day: number;
  dayText: string;
  therapist?: ITherapist;
  onClose: () => void;
}

export type TCreateNewScheduleFC = FC<ITCreateNewScheduleProps>;

export type TCreateNewScheduleFormValidation = zod.infer<typeof createNewScheduleFormValidation>;
