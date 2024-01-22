import { IPatient } from "@/types/patient.model";
import { FC } from "react";

export interface ViewOrdersDialogProps {
  selectedPatient?: IPatient;
}

export type TViewOrdersDialogFC = FC<ViewOrdersDialogProps>;
