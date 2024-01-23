import { FC } from "react";

export interface IFilterLocationDialogProps {
  onClose: () => void;
}

export type TFilterLocationDialogFC = FC<IFilterLocationDialogProps>;
