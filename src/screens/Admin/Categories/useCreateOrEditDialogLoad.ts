import { lazy, useState } from "react";
import { TCreateOrEditCategoryDialogFC } from "./components/CreateOrEditCategoryDialog/index.type";

export const useCreateOrEditDialogLoad = () => {
  const [Component, setComponent] = useState<TCreateOrEditCategoryDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/CreateOrEditCategoryDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
