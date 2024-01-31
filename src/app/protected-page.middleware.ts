import { withAuth } from "next-auth/middleware";
export const protctedPageMiddleware = withAuth({
  callbacks: {
    authorized(params) {
      return !!params.token;
    },
  },
  secret: "xxx",
  pages: { signIn: "/auth/login" },
});
