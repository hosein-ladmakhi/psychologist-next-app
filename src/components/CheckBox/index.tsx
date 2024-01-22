import { FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { TCheckBoxFC } from "./index.type";

const CheckBox: TCheckBoxFC = ({ control, label, name, defaultChecked }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return <FormControlLabel {...field} control={<MuiCheckbox defaultChecked={defaultChecked} />} label={label} />;
      }}
    />
  );
};

export default CheckBox;
