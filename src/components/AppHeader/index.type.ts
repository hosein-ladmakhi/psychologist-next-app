import { THeaderItem } from "@/types/base.model";
import { IPatient } from "@/types/patient.model";
import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface IAppHeaderProps {
  menuItems: THeaderItem[];
  user: ITherapist | IPatient;
}

export type TAppHeaderFC = FC<IAppHeaderProps>;
