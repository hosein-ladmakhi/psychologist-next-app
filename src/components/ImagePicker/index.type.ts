import { ForwardRefRenderFunction } from "react";

export interface IImagePickerProps {
  height: number;
  width: number;
  defaultSrc?: string;
}

export type TImagePickerFC = ForwardRefRenderFunction<File | null, IImagePickerProps>;
