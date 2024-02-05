import { FC } from "react";

interface IUploadDocumentDialogProps {
  handleClose: () => void;
}

export type TUploadDocumentDialogFC = FC<IUploadDocumentDialogProps>;

export type TDocumentFileStatus = "inprogress" | "pending" | "done" | "failed";

export interface IDocumentFile {
  file: File;
  id: number;
  status: TDocumentFileStatus;
}
