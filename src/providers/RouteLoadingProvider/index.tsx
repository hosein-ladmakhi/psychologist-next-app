"use client";

import { usePathname } from "next/navigation";
import { TRouteLoadingProviderFC } from "./index.type";

import "nprogress/nprogress.css";
import { useEffect, useLayoutEffect } from "react";
import nprogress from "nprogress";

const RouteLoadingProvider: TRouteLoadingProviderFC = ({ children }) => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    nprogress.start();
  }, [pathname]);

  useEffect(() => {
    nprogress.done();
  }, [pathname]);

  return <>{children}</>;
};

export default RouteLoadingProvider;
