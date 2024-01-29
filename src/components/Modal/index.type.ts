import { FC, PropsWithChildren } from "react";
import { modalWidthSize } from "./index.constant";

export interface IModalProps extends PropsWithChildren {
  size?: keyof typeof modalWidthSize;
  title: string;
  handleClose?: () => void;
  opened?: boolean;
}

export type TModalFC = FC<IModalProps>;
