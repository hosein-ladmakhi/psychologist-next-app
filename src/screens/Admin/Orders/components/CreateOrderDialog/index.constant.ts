import zod from "zod";

export const createOrderFormValidation = zod.object({
  patient: zod.coerce.number({ invalid_type_error: "Please select the patient", required_error: "Please select the patient" }),
  therapist: zod.coerce.number({
    invalid_type_error: "Select the therapist that you want to have session",
    required_error: "Select the therapist that you want to have session",
  }),
  day: zod.coerce.number({ required_error: "Select the day that you want reserve", invalid_type_error: "Select the day that you want reserve" }),
  location: zod.any(),
  room: zod.any(),
  categories: zod
    .array(zod.coerce.number(), { invalid_type_error: "Please select at least one category", required_error: "Please select at least one category" })
    .min(1, { message: "Please select at least one category" }),
  type: zod.string({ required_error: "Please select how you want to reserve this session" }),
  time: zod.string({ required_error: "Please select the time that you want" }),
  date: zod.string({ required_error: "Please select the date that you want" }),
});
