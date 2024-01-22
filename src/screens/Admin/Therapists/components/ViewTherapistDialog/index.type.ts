import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface IViewTherapistDialogProps {
  selectedTherapist?: ITherapist;
  onClose: () => void;
}

export type TViewTherapistDialogFC = FC<IViewTherapistDialogProps>;
