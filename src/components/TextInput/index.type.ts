import { FC, ReactNode } from "react";

export interface ITextInputProps {
  control: any;
  name: string;
  label: string;
  rows?: number;
  multiline?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  helperText?: string;
  type?: string;
}

export type ITextInputFC = FC<ITextInputProps>;
