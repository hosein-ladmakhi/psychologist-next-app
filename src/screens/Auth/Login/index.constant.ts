import * as zod from "zod";

export const loginFormValidation = zod.object({
  phone: zod.string({ required_error: "شما باید شماره تماس خود را وارد کنید" }).length(11, "شماره تماس وارد شده فرمت نادرستی دارد"),
  password: zod.string({ required_error: "شما باید گذرواژه خود را وارد کنید" }).min(8, "گذرواژه باید حداقل 8 حرف داشته باشد"),
});
