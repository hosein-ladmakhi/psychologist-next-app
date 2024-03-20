import * as zod from "zod";

export const createOrEditPatientFormValidation = zod.object({
  firstName: zod.string({ required_error: "نام بیمار باید پر شود" }).min(3, "نام بیمار باید حداقل 3 حرف داشته باشد"),
  lastName: zod.string({ required_error: "نام خانوادگی بیمار باید پر شود" }).min(3, "نام خانوادگی بیمار باید حداقل 3 حرف داشته باشد"),
  phone: zod.string({ required_error: "شماره تماس بیمار باید پر شود" }).length(11, "شماره تماس وارد شده فرمت نادرستی دارد"),
});
