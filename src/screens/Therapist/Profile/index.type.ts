import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";
import * as zod from "zod";
import { createOrEditOwnTherapistFormValidation } from "./index.constant";

interface IProfileScreenProps {
  user: ITherapist;
}

export type TProfileScreenFC = FC<IProfileScreenProps>;

export type TCreateOrEditOwnTherapistFormValidation = zod.infer<typeof createOrEditOwnTherapistFormValidation>;
