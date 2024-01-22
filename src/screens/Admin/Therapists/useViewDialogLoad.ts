import { lazy, useState } from "react";
import { TViewTherapistDialogFC } from "./components/ViewTherapistDialog/index.type";

export const useViewDialogLoad = () => {
  const [Component, setComponent] = useState<TViewTherapistDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/ViewTherapistDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
