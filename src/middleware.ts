import { withAuth as withNextAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

const withAuth = () => {
  return (request: NextRequest, event: NextFetchEvent) => {
    withNextAuth({
      callbacks: {
        authorized(params) {
          return !!params.token;
        },
      },
      secret: "xxx",
      pages: { signIn: "/auth/login" },
    })(request as any, event);
  };
};

export default withAuth();

export const config = { matcher: ["/"] };
