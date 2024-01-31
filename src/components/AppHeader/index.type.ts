import { THeaderItem } from "@/types/base.model";
import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";

export interface IAppHeaderProps {
  menuItems: THeaderItem[];
  user: ITherapist;
}

export type TAppHeaderFC = FC<IAppHeaderProps>;
