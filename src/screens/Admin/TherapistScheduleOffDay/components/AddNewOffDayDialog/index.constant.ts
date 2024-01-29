import * as zod from "zod";

export const addNewOffDayFormValidation = zod.object({
  date: zod.any(),
  schedule: zod.coerce.number({ invalid_type_error: "You Must Select The Schedule", required_error: "You Must Select The Schedule" }),
  therapist: zod.any(),
  day: zod.any(),
});
