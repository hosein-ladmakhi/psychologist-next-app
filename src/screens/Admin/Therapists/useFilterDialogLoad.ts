import { lazy, useState } from "react";
import { TFilterTherapistDialogFC } from "./components/FilterTherapistDialog/index.type";

export const useFilterDialogLoad = () => {
  const [Component, setComponent] = useState<TFilterTherapistDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/FilterTherapistDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
