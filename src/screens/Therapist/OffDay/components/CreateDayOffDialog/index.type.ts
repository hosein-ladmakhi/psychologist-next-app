import { FC } from "react";
import zod from "zod";
import { createDayOffFormValidation } from "./index.constant";
import { ITherapistSchedulesOff } from "@/types/therapist.model";

interface ICreateDayOffDialogProps {
  onClose: () => void;
  offDays: ITherapistSchedulesOff[];
}

export type TCreateDayOffDialogFC = FC<ICreateDayOffDialogProps>;

export type TCreateDayOffFormValidation = zod.infer<typeof createDayOffFormValidation>;
