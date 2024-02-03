import { FC } from "react";
import * as zod from "zod";
import { filterOrderFormValidation } from "./index.constant";

export interface IFilterOrderFormProps {
  therapistId: number;
  handleClose: () => void;
}

export type TFilterOrderFormFC = FC<IFilterOrderFormProps>;

export type TFilterOrderFormValidation = zod.infer<typeof filterOrderFormValidation>;
