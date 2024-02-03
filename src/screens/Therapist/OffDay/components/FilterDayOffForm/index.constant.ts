import * as zod from "zod";
export const filterDayOffFormValidation = zod.object({
  day: zod.string().optional(),
  date: zod.any().optional(),
});
