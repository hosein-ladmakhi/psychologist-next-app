import * as zod from "zod";

export const addNewOffDayFormValidation = zod.object({
  date: zod.any(),
  schedule: zod.coerce.number({ invalid_type_error: "آیتم رزروی خود را انتخاب کنید", required_error: "آیتم رزروی خود را انتخاب کنید" }),
  therapist: zod.any(),
  day: zod.any(),
});
