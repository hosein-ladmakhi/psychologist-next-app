import { withAuth } from "next-auth/middleware";
export const protctedPageMiddleware = withAuth({
  callbacks: {
    authorized(params) {
      console.log("params", params);
      return !!params.token;
    },
  },
  secret: "xxx",
  pages: { signIn: "/auth/login" },
});
