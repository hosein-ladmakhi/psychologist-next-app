"use server";

import { TSignupFormValidation } from "@/screens/Auth/Signup/index.type";
import { signupUser } from "@/services/auth.service";

export const signupAction = async (body: TSignupFormValidation) => {
  const { role, ...data } = body;
  const res = await signupUser(role, data);
  return res?.token;
};
