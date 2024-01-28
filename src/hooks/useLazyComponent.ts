"use client";

import { lazy, useState } from "react";

export const useLazyComponent = <TComponentFC>(importPath: Promise<{ default: any }>) => {
  const [Component, setComponent] = useState<TComponentFC>();

  const loadComponent = async () => {
    const component = await lazy(() => importPath);
    setComponent(component as TComponentFC);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
