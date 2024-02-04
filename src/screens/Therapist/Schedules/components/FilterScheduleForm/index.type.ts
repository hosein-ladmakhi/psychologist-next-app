import { FC } from "react";
import * as zod from "zod";
import { filterScheduleFormValidation } from "./index.constant";

interface IFilterScheduleForm {}

export type TFilterScheduleFormFC = FC<IFilterScheduleForm>;

export type TFilterScheduleFormValidation = zod.infer<typeof filterScheduleFormValidation>;
