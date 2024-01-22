import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface IScheduleTherapistDialogProps {
  selectedTherapist?: ITherapist;
  onClose: () => void;
}

export type TScheduleTherapistDialogFC = FC<IScheduleTherapistDialogProps>;
