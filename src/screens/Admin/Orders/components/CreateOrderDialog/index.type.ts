import { FC } from "react";
import zod from "zod";
import { createOrderFormValidation } from "./index.constant";

interface ICreateOrderDialogProps {
  onClose: () => void;
}

export type TCreateOrderDialogFC = FC<ICreateOrderDialogProps>;

export type TCreateOrderFormValidation = zod.infer<typeof createOrderFormValidation>;
