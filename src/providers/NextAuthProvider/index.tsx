"use client";

import { SessionProvider } from "next-auth/react";
import { TNextAuthProviderFC } from "./index.type";

const NextAuthProvider: TNextAuthProviderFC = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
