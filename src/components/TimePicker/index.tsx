"use client";

import { TTimePickerFC } from "./index.type";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

const TimePicker: TTimePickerFC = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const err = fieldState.error?.message;
        return (
          <MuiTimePicker
            slotProps={{ textField: { fullWidth: true, margin: "dense", error: !!err, helperText: err } }}
            orientation="landscape"
            {...field}
            label={label}
            views={["hours", "minutes"]}
            ampm={false}
          />
        );
      }}
      control={control}
    />
  );
};

export default TimePicker;
