import { FC } from "react";

interface ITimePickerProps {
  name: string;
  control: any;
  label: string;
}

export type TTimePickerFC = FC<ITimePickerProps>;
