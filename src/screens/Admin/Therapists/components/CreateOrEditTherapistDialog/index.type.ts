import { ITherapist } from "@/types/therapist.model";
import * as zod from "zod";
import { createOrEditTherapistFormValidation } from "./index.constant";
import { FC } from "react";

export interface ICreateOrEditTherapistDialogProps {
  selectedTherapist?: ITherapist;
  onClose: () => void;
}

export type TCreateOrEditTherapistFormValidation = zod.infer<typeof createOrEditTherapistFormValidation>;

export type TCreateOrEditTherapistDialogFC = FC<ICreateOrEditTherapistDialogProps>;
