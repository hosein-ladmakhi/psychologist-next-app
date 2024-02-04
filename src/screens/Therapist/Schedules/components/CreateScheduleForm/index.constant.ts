import zod from "zod";

export const createScheduleFormValidation = zod.object({
  day: zod.coerce.number({ invalid_type_error: "You Must Choose Which Day You Want", required_error: "You Must Choose Which Day You Want" }),
  room: zod.coerce.number({ invalid_type_error: "Please Enter Room Number", required_error: "Please Enter Room Number" }),
  location: zod.coerce.number({ invalid_type_error: "Select The Location", required_error: "Select The Location" }),
  startTime: zod.any(),
  endTime: zod.any(),
  type: zod.string({ required_error: "Select The Correct Schedule Type Please" }),
});
