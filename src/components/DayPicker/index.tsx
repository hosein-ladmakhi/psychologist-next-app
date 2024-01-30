import { DATES } from "@/constants";
import Select from "../Select";
import { TDayPickerFC } from "./index.type";

const OPTIONS = Object.entries(DATES).map(([key, value]) => ({ value: key, key: value }));

const DayPicker: TDayPickerFC = ({ control, label, name }) => {
  return <Select id="select-day" label={label} name={name} options={OPTIONS} control={control} />;
};

export default DayPicker;
