import { TSelectOptions } from "@/types/base.model";
import { ETherapistScheduleType } from "@/types/therapist.model";
import * as zod from "zod";

export const CREATE_NEW_SCHEDULE_SUBJECT = "CREATE_NEW_SCHEDULE_SUBJECT";

export const SCHEDULE_TYPE_OPTIONS: TSelectOptions[] = [
  {
    key: "Both",
    value: ETherapistScheduleType.both,
  },
  {
    key: "Online",
    value: ETherapistScheduleType.online,
  },
  {
    key: "Onsite",
    value: ETherapistScheduleType.onsite,
  },
];

export const createNewScheduleFormValidation = zod.object({
  day: zod.any(),
  therapist: zod.any(),
  startTime: zod.any(),
  endTime: zod.any(),
  location: zod.coerce.number({ required_error: "Select Your Location", invalid_type_error: "Select Your Location" }).transform(Number),
  room: zod.coerce.number({ required_error: "Enter Your Room Number", invalid_type_error: "Enter Your Room Number" }).transform(Number),
  type: zod.string({ required_error: "Select Your Schedule Type" }),
});
