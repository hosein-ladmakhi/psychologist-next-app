import * as zod from "zod";
export const filterScheduleFormValidation = zod.object({
  day: zod.string().optional(),
  location: zod.number().optional(),
  type: zod.string().optional(),
  time: zod.string().optional(),
  room: zod.number().optional(),
});
