import { lazy, useState } from "react";
import { TDoneOrderDialogFC } from "./components/DoneOrderDialog/index.type";

export const useDoneOrderDialogLoad = () => {
  const [Component, setComponent] = useState<TDoneOrderDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/DoneOrderDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
