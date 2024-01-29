import * as zod from "zod";

export const createOrEditLocationFormValidation = zod.object({
  city: zod.string({ required_error: "You Must Select The City" }),
  address: zod.string({ required_error: "You Must Fill The Address" }).min(3, "Your Address Must At Least 3 Character"),
});
