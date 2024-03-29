import { IPatient } from "@/types/patient.model";
import { FC } from "react";

export interface IFilterPatientDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterPatientFormValidation) => void;
}

export type TFilterPatientFormValidation = Partial<Pick<IPatient, "firstName" | "lastName" | "phone">>;

export type TFilterPatientDialogFC = FC<IFilterPatientDialogProps>;
