import { lazy, useState } from "react";
import { TCreateOrEditPatientDialogFC } from "./components/CreateOrEditPatientDialog/index.type";

export const useCreateOrEditDialogLoad = () => {
  const [Component, setComponent] = useState<TCreateOrEditPatientDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/CreateOrEditPatientDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
