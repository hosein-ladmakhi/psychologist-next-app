import { lazy, useState } from "react";
import { TFilterOrderDialogFC } from "./components/FilterOrderDialog/index.type";

export const useFilterDialogLoad = () => {
  const [Component, setComponent] = useState<TFilterOrderDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/FilterOrderDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
