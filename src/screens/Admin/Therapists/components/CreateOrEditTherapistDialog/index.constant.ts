import { EDegtreeOfEducation } from "@/types/therapist.model";
import * as zod from "zod";

export const createOrEditTherapistFormValidation = zod.object({
  firstName: zod.string({ required_error: "فیلد نام پزشک اجباری میباشد" }).min(3, "فیلد نام حداقل باید 3 کاراکتر داشته باشد"),
  lastName: zod.string({ required_error: "فیلد نام خانوادگی پزشک اجباری میباشد" }).min(3, "فیلد نام خانوادگی حداقل باید 3 حرف داشته باشد"),
  phone: zod.string({ required_error: "شماره تماس اول باید پر شود" }).length(11, "فرمت شماره تماس وارد شده نادرست میباشد"),
  phone2: zod.string({ required_error: "شماره تماس دوم باید پر شود" }).length(11, "فرمت شماره تماس وارد شده نادرست میباشد"),
  bio: zod.string({ required_error: "فیلد بیوگرافی پزشک را پر کنید" }).min(3, "فیلد بیوگرافی پزشک باید حداقل 3 حرف داشته باشد"),
  address: zod.string({ required_error: "آدرس خونه باید پر شود" }).min(3, "آدرس خونه باید حداقل 3 حرف داشته باشد"),
  workingFields: zod.array(zod.number()).min(1, "باید حداقل یک زمینه تخصصی برای پزشک انتخاب کنید").default([]),
  degreeOfEducation: zod
    .string({
      required_error: "مدرک تحصیلی پزشک را انتخاب کنید",
    })
    .refine((arg) => Object.values(EDegtreeOfEducation).includes(arg as any), "مدرک تحصیلی پزشک را انتخاب کنید"),
  gender: zod.string({ required_error: "جنسیت پزشک را پر کنید" }),
});
