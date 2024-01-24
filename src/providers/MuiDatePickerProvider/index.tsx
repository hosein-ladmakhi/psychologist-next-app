"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateFn } from "@mui/x-date-pickers";
import { TMuiDatePickerProviderFC } from "./index.type";

const MuiDatePickerProvider: TMuiDatePickerProviderFC = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};

export default MuiDatePickerProvider;
