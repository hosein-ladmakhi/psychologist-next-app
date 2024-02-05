"use server";

import { RedirectType, redirect } from "next/navigation";

export const unauthServerRedirect = () => {
  console.log("hello nima ladmakhi");
  return redirect("/auth/login", RedirectType.replace);
};
