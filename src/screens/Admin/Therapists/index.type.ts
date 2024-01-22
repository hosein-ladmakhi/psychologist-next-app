import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface ITherapistsScreenProps {
  data: ITherapist[];
  total: number;
  page: number;
}

export type TTherapistsScreenFC = FC<ITherapistsScreenProps>;
