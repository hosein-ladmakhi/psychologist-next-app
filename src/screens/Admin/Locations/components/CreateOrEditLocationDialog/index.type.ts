import { ILocation } from "@/types/location.model";
import { FC } from "react";
import { createOrEditLocationFormValidation } from "./index.constant";
import * as zod from "zod";

export interface ICreateOrEditLocationDialogProps {
  selectedLocation?: ILocation;
  onClose: () => void;
}

export type TCreateOrEditLocationDialogFC = FC<ICreateOrEditLocationDialogProps>;

export type TCreateOrEditLocationFormValidation = zod.infer<typeof createOrEditLocationFormValidation>;
