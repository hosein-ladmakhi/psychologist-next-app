"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { TLocalizationPickerProviderFC } from "./index.type";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const LocalizationPickerProvider: TLocalizationPickerProviderFC = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>;
};

export default LocalizationPickerProvider;
