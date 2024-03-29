import { Metadata } from "next";
import { TLoginPageFC } from "./page.type";
import LoginScreen from "@/screens/Auth/Login";

export const metadata: Metadata = {
  title:"ورود به حساب کاربری"
}

const LoginPage: TLoginPageFC = () => {
  return <LoginScreen />;
};

export default LoginPage;
