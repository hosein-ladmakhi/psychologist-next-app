import { TSelectOptions } from "@/types/base.model";
import { ETherapistScheduleType } from "@/types/therapist.model";
import * as zod from "zod";

export const SCHEDULE_TYPE_OPTIONS: TSelectOptions[] = [
  {
    key: "حضوری و آنلاین",
    value: ETherapistScheduleType.both,
  },
  {
    key: "آنلاین",
    value: ETherapistScheduleType.online,
  },
  {
    key: "حضوری",
    value: ETherapistScheduleType.onsite,
  },
];

export const createNewScheduleFormValidation = zod.object({
  day: zod.any(),
  therapist: zod.any(),
  startTime: zod.any(),
  endTime: zod.any(),
  location: zod.coerce.number({ required_error: "آدرس محل برگزاری رزرو را انتخاب کنید", invalid_type_error: "آدرس محل برگزاری رزرو را انتخاب کنید" }).transform(Number),
  room: zod.coerce.number({ required_error: "اتاق برگزاری رزرو را وارد کنید", invalid_type_error: "اتاق برگزاری رزرو را وارد کنید" }).transform(Number),
  type: zod.string({ required_error: "نوع برگزاری رزرو را وارد کنید" }),
});
