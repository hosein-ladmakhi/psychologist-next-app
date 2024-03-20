import * as zod from "zod";

export const createOrEditLocationFormValidation = zod.object({
  city: zod.string({ required_error: "فیلد شهر باید پر شود" }),
  address: zod.string({ required_error: "فیلد آدرس محلی باید پر شود" }).min(3, "فیلد آدرس محلی باید حداقل 3 حرف داشته باشد"),
});
