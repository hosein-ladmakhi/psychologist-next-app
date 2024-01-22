import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface IFilterTherapistDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterTherapistFormValidation) => void;
}

export type TFilterTherapistFormValidation = Partial<Pick<ITherapist, "firstName" | "lastName" | "phone">>;

export type TFilterTherapistDialogFC = FC<IFilterTherapistDialogProps>;
