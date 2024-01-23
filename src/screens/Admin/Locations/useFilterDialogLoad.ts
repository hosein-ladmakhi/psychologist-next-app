import { lazy, useState } from "react";
import { TFilterLocationDialogFC } from "./components/FilterLocationDialog/index.type";

export const useFilterDialogLoad = () => {
  const [Component, setComponent] = useState<TFilterLocationDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/FilterLocationDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
