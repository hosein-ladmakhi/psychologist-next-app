import { FormControl, FormControlLabel, FormHelperText, FormLabel, RadioGroup as MuiRadioGroup, Radio } from "@mui/material";
import { TRadioGroupFC } from "./index.type";
import { Controller } from "react-hook-form";

const RadioGroup: TRadioGroupFC = ({ id, label, name, radios, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const err = fieldState.error?.message;
        return (
          <FormControl error={!!err} margin="dense">
            <FormLabel id={id}>{label}</FormLabel>
            <MuiRadioGroup row aria-labelledby={id} {...field}>
              {radios.map((radio) => (
                <FormControlLabel key={radio.key} value={radio.value} control={<Radio />} label={radio.key} />
              ))}
            </MuiRadioGroup>
            <FormHelperText>{err}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default RadioGroup;
