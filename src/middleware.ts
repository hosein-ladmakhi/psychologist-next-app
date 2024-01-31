import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { protctedPageMiddleware } from "./app/protected-page.middleware";

const middleware = (request: NextRequest, event: NextFetchEvent) => {
  const reqPathname = request.nextUrl.pathname;
  if (reqPathname.startsWith("/therapist") || reqPathname.startsWith("/admin")) return protctedPageMiddleware(request as any, event);
  return NextResponse.next();
};

export default middleware;
