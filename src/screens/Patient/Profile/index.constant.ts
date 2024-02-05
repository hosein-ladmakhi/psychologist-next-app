import zod from "zod";

export const profileFormValidation = zod
  .object({
    firstName: zod
      .string({ invalid_type_error: "Enter Your First Name Please", required_error: "Enter Your First Name Please" })
      .min(3, { message: "Your First Name Must Include At Least 3 Character" }),
    lastName: zod
      .string({ invalid_type_error: "Enter Your Last Name Please", required_error: "Enter Your Last Name Please" })
      .min(3, { message: "Your Last Name Must Include At Least 3 Character" }),
    phone: zod
      .string({ invalid_type_error: "Enter Your Phone Number Please", required_error: "Enter Your Phone Number Please" })
      .min(11, { message: "Your Phone Must Include At Least 11 Character" }),
    currentPassword: zod.string().optional(),
    password: zod.string().optional(),
  })
  .refine(
    (args) => {
      if (args.password && !args.currentPassword) return false;
      if (args.password && args.currentPassword) {
        return args.password.length >= 8 && args.currentPassword.length >= 8;
      }
      return true;
    },
    { message: "When you want to update your password, you must provide your current password", path: ["currentPassword"] }
  );
