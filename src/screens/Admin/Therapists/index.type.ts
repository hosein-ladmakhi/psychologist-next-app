import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface ITherapistsScreenProps {
  data: ITherapist[];
  totalPage: number;
  page: number;
  count: number
}

export type TTherapistsScreenFC = FC<ITherapistsScreenProps>;
