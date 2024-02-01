"use server";

import { RedirectType, redirect } from "next/navigation";

export const redirectionApiErr = () => {
  return redirect("/auth/login", RedirectType.replace);
};
