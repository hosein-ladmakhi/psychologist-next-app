import { FC } from "react";

interface IViewDocumentDialogProps {
  docURL: string;
  handleCloseViewDocDialog: () => void;
}

export type TViewDocumentDialogFC = FC<IViewDocumentDialogProps>;
