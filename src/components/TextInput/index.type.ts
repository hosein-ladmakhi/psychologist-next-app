import { FC } from "react";

export interface ITextInputProps {
  control: any;
  name: string;
  label: string;
  rows?: number;
  multiline?: boolean;
  disabled?: boolean;
}

export type ITextInputFC = FC<ITextInputProps>;
