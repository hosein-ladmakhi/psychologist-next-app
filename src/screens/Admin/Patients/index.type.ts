import { IPatient } from "@/types/patient.model";
import { FC } from "react";

export interface IPatientsProps {
  data: IPatient[];
  totalPage: number;
  page: number;
  count: number;
}

export type TPatientsScreenFC = FC<IPatientsProps>;
