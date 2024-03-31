"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { TLocalizationPickerProviderFC } from "./index.type";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

const LocalizationPickerProvider: TLocalizationPickerProviderFC = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>{children}</LocalizationProvider>;
};

export default LocalizationPickerProvider;
