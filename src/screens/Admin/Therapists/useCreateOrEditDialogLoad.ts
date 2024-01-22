import { lazy, useState } from "react";
import { TCreateOrEditTherapistDialogFC } from "./components/CreateOrEditTherapistDialog/index.type";

export const useCreateOrEditDialogLoad = () => {
  const [Component, setComponent] = useState<TCreateOrEditTherapistDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/CreateOrEditTherapistDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
