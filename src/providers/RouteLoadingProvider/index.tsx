"use client";

import { TRouteLoadingProviderFC } from "./index.type";
import NextTopLoader from "nextjs-toploader";

const RouteLoadingProvider: TRouteLoadingProviderFC = ({ children }) => {
  return (
    <>
      <NextTopLoader color="#6c5ce7" height={6} crawl showSpinner={false} zIndex={100000} />
      {children}
    </>
  );
};

export default RouteLoadingProvider;
