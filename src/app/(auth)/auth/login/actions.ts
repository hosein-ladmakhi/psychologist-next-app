import { TLoginFormValidation } from "@/screens/Auth/Login/index.type";
import { signIn } from "next-auth/react";

export const loginAction = async (body: TLoginFormValidation) => {
  const res = await signIn("credentials", { ...body, role: 'therapist', redirect: false });
  return res?.status === 200;
};
