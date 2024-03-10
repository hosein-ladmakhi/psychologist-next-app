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
        console.log(1234, res);
        return res?.token ? { accessToken: res?.token } : undefined;
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
      const accessToken = token?.accessToken;
      if (accessToken) {
        const decoded = jwtDecode<any>(accessToken);
        session.userToken = accessToken;
        session.decoded = decoded;
      }
      return session;
    },
  },
};
