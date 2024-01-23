import { lazy, useState } from "react";
import { TCreateOrEditLocationDialogFC } from "./components/CreateOrEditLocationDialog/index.type";

export const useCreateOrEditDialogLoad = () => {
  const [Component, setComponent] = useState<TCreateOrEditLocationDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/CreateOrEditLocationDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
