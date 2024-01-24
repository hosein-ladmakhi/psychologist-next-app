import { lazy, useState } from "react";
import { TDocumentationDialogFC } from "./components/DocumentationDialog/index.type";

export const useDocumentationDialogLoad = () => {
  const [Component, setComponent] = useState<TDocumentationDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/DocumentationDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
