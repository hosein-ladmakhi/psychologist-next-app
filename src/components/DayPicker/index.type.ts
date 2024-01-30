import { FC } from "react";

export interface IDayPickerProps {
  control: any;
  name: string;
  label: string;
}

export type TDayPickerFC = FC<IDayPickerProps>;
