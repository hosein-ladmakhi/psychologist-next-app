import * as zod from "zod";

export const signupFormValidation = zod.object({
  firstName: zod.string({ required_error: "You Must Fill The First Name" }).min(3, "Your First Name Must At Least Contain 3 Character"),
  lastName: zod.string({ required_error: "You Must Fill The Last Name" }).min(3, "Your Last Name Must At Least Contain 3 Character"),
  phone: zod.string({ required_error: "You Must Provide Your Phone Number" }).length(11, "Your Phone Number Has Invalid Format"),
  password: zod.string({ required_error: "You Must Provide Your Password" }).min(8, "Your Password Must At Least Contain 8 Character"),
  role: zod.string({ required_error: "You Must Select Your Role" }),
});
