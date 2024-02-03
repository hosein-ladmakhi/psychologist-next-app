import * as zod from "zod";

export const filterOrderFormValidation = zod.object({
  date: zod.any().optional(),
  day: zod.string({}).optional(),
  type: zod.string().optional(),
  patient: zod.number().optional(),
  time: zod.string().optional(),
  location: zod.string().optional(),
  category: zod.string().optional(),
  status: zod.string().optional(),
});
