import { IPatient } from "@/types/patient.model";
import { FC } from "react";
import { profileFormValidation } from "./index.constant";
import zod from "zod";

interface IProfileScreenProps {
  user?: IPatient;
}

export type TProfileScreenFC = FC<IProfileScreenProps>;

export type TProfileFormValidation = zod.infer<typeof profileFormValidation>;
