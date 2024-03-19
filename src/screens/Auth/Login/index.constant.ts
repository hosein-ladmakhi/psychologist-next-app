import * as zod from "zod";

export const loginFormValidation = zod.object({
  phone: zod.string({ required_error: "You Must Provide Your Phone Number" }).length(11, "Your Phone Number Has Invalid Format"),
  password: zod.string({ required_error: "You Must Provide Your Password" }).min(8, "Your Password Must At Least Contain 8 Character"),
});
