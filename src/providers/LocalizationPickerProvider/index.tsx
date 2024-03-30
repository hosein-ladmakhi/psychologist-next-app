"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { TLocalizationPickerProviderFC } from "./index.type";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";

const LocalizationPickerProvider: TLocalizationPickerProviderFC = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterMomentJalaali}>{children}</LocalizationProvider>;
};

export default LocalizationPickerProvider;
