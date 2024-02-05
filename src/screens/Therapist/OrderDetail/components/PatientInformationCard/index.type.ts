import { IPatient } from "@/types/patient.model";
import { FC } from "react";

interface IPatientInformationCardProps {
  patient: IPatient;
}

export type TPatientInformationCardFC = FC<IPatientInformationCardProps>;
