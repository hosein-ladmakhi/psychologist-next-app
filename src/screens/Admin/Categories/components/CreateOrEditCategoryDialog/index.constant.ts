import * as zod from "zod";

export const createOrEditCategoryFormValidation = zod.object({
  faName: zod.string({ required_error: "نام فارسی زمینه تخصصی را وارد کنید" }).min(3, "نام فارسی زمینه تخصصی باید حداقل 3 کاراکتر داشته باشد"),
  enName: zod.string({ required_error: "نام اینگلیسی زمینه تخصصی را وارد کنید" }).min(3, "نام اینگلیسی باید حداقل  3 کاراکتر داشته باشد"),
});
