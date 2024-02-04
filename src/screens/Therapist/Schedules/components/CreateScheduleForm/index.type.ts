import { FC } from "react";
import zod from "zod";
import { createScheduleFormValidation } from "./index.constant";

interface ICreateScheduleFormProps {
  handleClose: () => void;
}

export type TCreateScheduleFormFC = FC<ICreateScheduleFormProps>;

export type TCreateScheduleFormValidation = zod.infer<typeof createScheduleFormValidation>;
