import { lazy, useState } from "react";
import { TFilterCategoryDialogFC } from "./components/FilterCategoryDialog/index.type";

export const useFilterDialogLoad = () => {
  const [Component, setComponent] = useState<TFilterCategoryDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/FilterCategoryDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
