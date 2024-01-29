import { THeaderItem } from "@/types/base.model";
import { FC } from "react";

export interface IAppHeaderProps {
  menuItems: THeaderItem[];
}

export type TAppHeaderFC = FC<IAppHeaderProps>;
