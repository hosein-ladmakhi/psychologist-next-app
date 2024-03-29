import { loginUser } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: "xxx",
  providers: [
    CredentialsProvider({
      name: "credentials",
      //   @ts-ignore
      authorize: async (credentials: TLoginFormValidation) => {
        const { role, ...data } = credentials;
        const res = await loginUser(role, data);
        return res?.token ? { accessToken: res?.token, ...res } : undefined;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }: any) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};
