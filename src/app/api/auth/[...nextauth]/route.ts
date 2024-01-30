import { TLoginFormValidation } from "@/screens/Auth/Login/index.type";
import { loginUser } from "@/services/auth.service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      //   @ts-ignore
      authorize: async (credentials: TLoginFormValidation) => {
        const { role, ...data } = credentials;
        const res = await loginUser(role, data);
        return { accessToken: res?.token };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }: any) {
      const accessToken = token?.accessToken;
      if (accessToken) {
        const decoded = jwtDecode<any>(accessToken);
        console.log("decode", decoded);
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
