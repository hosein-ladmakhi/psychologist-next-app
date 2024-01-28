import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";
import * as zod from "zod";
import { addNewOffDayFormValidation } from "./index.constant";

export interface IAddNewOffDayDialogProps {
  therapist: ITherapist;
  onClose: () => void;
}

export type TAddNewOffDayDialogFC = FC<IAddNewOffDayDialogProps>;

export type TAddNewOffDayFormValidation = zod.infer<typeof addNewOffDayFormValidation>;
