import { IPatient } from "@/types/patient.model";
import { FC } from "react";

export interface IPatientsProps {
  data: IPatient[];
  total: number;
  page: number;
}

export type TPatientsScreenFC = FC<IPatientsProps>;
