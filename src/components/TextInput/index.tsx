import { InputAdornment, TextField } from "@mui/material";
import { ITextInputFC } from "./index.type";
import { Controller } from "react-hook-form";

const TextInput: ITextInputFC = ({ control, name, label, rows = 1, disabled = false, multiline = false, icon, helperText, type = "text" }) => {
  return (
    <Controller
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState }) => {
        const err = fieldState.error?.message;
        return (
          <TextField
            type={type}
            InputProps={{
              startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined,
            }}
            margin="dense"
            multiline={multiline}
            rows={rows}
            fullWidth
            label={label}
            error={!!err}
            helperText={err || helperText}
            {...field}
          />
        );
      }}
    />
  );
};

export default TextInput;
