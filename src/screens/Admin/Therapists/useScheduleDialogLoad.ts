import { lazy, useState } from "react";
import { TScheduleTherapistDialogFC } from "./components/ScheduleTherapistDialog/index.type";

export const useScheduleDialogLoad = () => {
  const [Component, setComponent] = useState<TScheduleTherapistDialogFC>();

  const loadComponent = async () => {
    const component = await lazy(() => import("./components/ScheduleTherapistDialog"));
    setComponent(component);
  };

  const unLoadComponent = () => {
    setComponent(undefined);
  };

  return { loadComponent, Component, unLoadComponent };
};
