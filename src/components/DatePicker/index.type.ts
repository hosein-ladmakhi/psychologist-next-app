import { FC } from "react";

export interface IDatePickerProps {
  name: string;
  label: string;
  control: any;
}

export type TDatePickerFC = FC<IDatePickerProps>;
