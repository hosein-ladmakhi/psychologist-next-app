"use client";

import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import { TTimePickerFC } from "./index.type";
import { Controller } from "react-hook-form";

const TimePicker: TTimePickerFC = ({ name, control, label }) => {
  return <Controller name={name} control={control} render={({ field, formState }) => <MuiTimePicker {...field} label={label} />} />;
};

export default TimePicker;
