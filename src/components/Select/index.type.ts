import { TSelectOptions } from "@/types/base.model";
import { FC } from "react";

export interface ISelectProps {
  name: string;
  control: any;
  defaultValue?: string | number[] | string[];
  label: string;
  id: string;
  options: TSelectOptions[];
  multiple?: boolean;
  disabled?: boolean;
}

export type TSelectFC = FC<ISelectProps>;
