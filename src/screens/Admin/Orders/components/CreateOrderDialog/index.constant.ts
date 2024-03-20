import zod from "zod";

export const createOrderFormValidation = zod.object({
  patient: zod.coerce.number({ invalid_type_error: "بیماری که قصد دریافت نوبت رزرو را دارد انتخاب کنید", required_error: "بیماری که قصد دریافت نوبت رزرو را دارد انتخاب کنید" }),
  therapist: zod.coerce.number({
    invalid_type_error: "لطفا پزشکی که قصد دریافت رزرو دارید رو انتخاب کنید",
    required_error: "لطفا پزشکی که قصد دریافت رزرو دارید رو انتخاب کنید",
  }),
  day: zod.coerce.number({ required_error: "روزی که قصد دریافت نوبت رزرو را دارید انتخاب کنید", invalid_type_error: "روزی که قصد دریافت نوبت رزرو را دارید انتخاب کنید" }),
  location: zod.any(),
  room: zod.any(),
  categories: zod
    .array(zod.coerce.number(), { invalid_type_error: "این نوبت رزرو در رابطه با کدام زمینه تخصصی میباشد", required_error: "این نوبت رزرو در رابطه با کدام زمینه تخصصی میباشد" })
    .min(1, { message: "این نوبت رزرو در رابطه با کدام زمینه تخصصی میباشد" }),
  type: zod.string({ required_error: "شیوه برگزاری این رزرو را انتخاب کنید" }),
  time: zod.string({ required_error: "بازه زمانی این رزرو را انتخاب کنید" }),
  date: zod.string({ required_error: "تاریخ برگزاری این رزرو را انتخاب کنید" }),
});
