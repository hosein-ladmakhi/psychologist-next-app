"use client";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { TDatePickerFC } from "./index.type";
import { Controller } from "react-hook-form";

const DatePicker: TDatePickerFC = ({ label, name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const err = fieldState.error?.message;
        return (
          <MuiDatePicker
            {...field}
            label={label}
            slotProps={{
              textField: { fullWidth: true, margin: "dense", error: !!err, helperText: err },
            }}
          />
        );
      }}
    />
  );
};

export default DatePicker;
