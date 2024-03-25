import zod from "zod";

export const createOrEditAdminFormValidation = zod.object({
    firstName: zod.string({ required_error: "نام ادمین باید پر شود" }).min(3, "نام ادمین باید حداقل 3 حرف داشته باشد"),
    lastName: zod.string({ required_error: "نام خانوادگی ادمین باید پر شود" }).min(3, "نام خانوادگی ادمین باید حداقل 3 حرف داشته باشد"),
    phone: zod.string({ required_error: "شماره تماس ادمین باید پر شود" }).length(11, "شماره تماس وارد شده فرمت نادرستی دارد"),
    password: zod.string({ required_error: "گذرواژه ادمین باید پر شود" }).min(8, "گذرواژه ادمین باید حداقل 8 حرف داشته باشد"),
    isActive: zod.string({ required_error: 'وضعیت ادمین را انتخاب کنید' })
});