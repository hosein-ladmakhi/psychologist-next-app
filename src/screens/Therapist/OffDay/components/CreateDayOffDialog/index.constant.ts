import zod from "zod";

export const createDayOffFormValidation = zod.object({
  date: zod.any(),
  schedule: zod.coerce.number({ required_error: "You Must Select Your Schedule", invalid_type_error: "You Must Select Your Schedule" }),
});
