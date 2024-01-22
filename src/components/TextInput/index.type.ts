import { FC } from "react";

export interface ITextInputProps {
  control: any;
  name: string;
  label: string;
  rows?: number;
  multiline?: boolean;
}

export type ITextInputFC = FC<ITextInputProps>;
