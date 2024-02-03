import { FC } from "react";
import * as zod from "zod";
import { filterDayOffFormValidation } from "./index.constant";

interface IFilterDayOffFormProps {
  onClose: () => void;
}

export type TFilterDayOffFormFC = FC<IFilterDayOffFormProps>;

export type TFilterDayOffFormValidation = zod.infer<typeof filterDayOffFormValidation>;
