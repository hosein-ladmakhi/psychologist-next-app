import { IPatient } from "@/types/patient.model";
import { createOrEditPatientFormValidation } from "./index.constant";
import * as zod from "zod";
import { FC } from "react";

export interface ICreateOrEditPatientDialogProps {
  onClose: () => void;
  selectedPatient?: IPatient;
}

export type TCreateOrEditPatientFormValidation = zod.infer<typeof createOrEditPatientFormValidation>;

export type TCreateOrEditPatientDialogFC = FC<ICreateOrEditPatientDialogProps>;
