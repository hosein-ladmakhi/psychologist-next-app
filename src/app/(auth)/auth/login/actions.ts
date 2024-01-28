import { TLoginFormValidation } from "@/screens/Auth/Login/index.type";
import { loginUser } from "@/services/auth.service";

export const loginAction = async (body: TLoginFormValidation) => {
  const { role, ...data } = body;
  const res = await loginUser(role, data);
  return res?.token;
};
