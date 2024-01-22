import { TextField } from "@mui/material";
import { ITextInputFC } from "./index.type";
import { Controller } from "react-hook-form";
import { getFormError } from "@/utils/getFormError";

const TextInput: ITextInputFC = ({ control, name, label, rows = 1, multiline = false }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => {
        const err = getFormError(formState, name);
        return <TextField multiline={multiline} rows={rows} fullWidth label={label} error={!!err} helperText={err} {...field} />;
      }}
    />
  );
};

export default TextInput;
