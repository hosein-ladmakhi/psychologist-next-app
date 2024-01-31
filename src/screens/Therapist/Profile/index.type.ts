import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";
import * as zod from "zod";
import { createOrEditOwnTherapistFormValidation } from "./index.constant";

export interface IProfileProps {
  user: ITherapist;
}

export type TProfileFC = FC<IProfileProps>;

export type TCreateOrEditOwnTherapistFormValidation = zod.infer<typeof createOrEditOwnTherapistFormValidation>;
