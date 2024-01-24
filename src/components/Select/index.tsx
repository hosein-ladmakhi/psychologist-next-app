import { getFormError } from "@/utils/getFormError";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { Controller } from "react-hook-form";
import { TSelectFC } from "./index.type";

const Select: TSelectFC = ({ control, name, defaultValue, label, id, options, multiple, disabled }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        return (
          <FormControl margin="dense" fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <MuiSelect
              defaultChecked
              disabled={disabled}
              labelId={id}
              label={label}
              error={!!getFormError(formState, name)}
              multiple={multiple}
              defaultValue={defaultValue}
              {...field}
            >
              {options.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
            </MuiSelect>
            <FormHelperText>{getFormError(formState, name)}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default Select;
