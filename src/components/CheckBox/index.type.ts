import { FC } from "react";

export interface ICheckBoxProps {
  name: string;
  control: any;
  defaultChecked?: boolean;
  label: string;
}

export type TCheckBoxFC = FC<ICheckBoxProps>;
