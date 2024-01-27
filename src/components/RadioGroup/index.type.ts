import { TSelectOptions } from "@/types/base.model";
import { FC } from "react";

export interface IRadioGroupProps {
  label: string;
  id: string;
  name: string;
  radios: TSelectOptions[];
  control: any;
}

export type TRadioGroupFC = FC<IRadioGroupProps>;
