"use server";

import { RedirectType, redirect } from "next/navigation";

export const unauthServerRedirect = () => {
  return redirect("/auth/login", RedirectType.replace);
};
