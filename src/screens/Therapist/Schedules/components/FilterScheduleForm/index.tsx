import { Box, Grid } from "@mui/material";
import { TFilterScheduleFormFC } from "./index.type";
import DayPicker from "@/components/DayPicker";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { scheduleTypesSelects } from "@/utils/selectOptions";
import { TSelectOptions } from "@/types/base.model";

const FilterScheduleForm: TFilterScheduleFormFC = ({ schedules }) => {
  const { control } = useForm();

  const LOCATIONS_OPTIONS = schedules.map((schedule) => ({ key: schedule.location.address, value: schedule.location.id }));

  const CITIES_OPTIONS = schedules.map((schedule) => ({ key: schedule.location.city, value: schedule.location.city }));

  const ROOMS_OPTIONS = schedules.map((schedule) => ({ key: `Room ${schedule.room}`, value: schedule.room }));

  const TIMES_OPTIONS = schedules
    .map((schedule) => ({
      key: `${schedule.startHour}_${schedule.endHour}`,
      value: `${schedule.startHour}_${schedule.endHour}`,
    }))
    .reduce((acc: TSelectOptions[], item) => {
      if (!acc.find((element) => element.key === item.key)) acc.push(item);
      return acc;
    }, []);

  const TYPES_OPTIONS = scheduleTypesSelects();

  return (
    <Box component="form" mt={5}>
      <Grid container columnSpacing={1.5}>
        <Grid item lg={4}>
          <DayPicker control={control} label="Day Of Schedule" name="day" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="Location Of Schedule" name="location" options={LOCATIONS_OPTIONS} id="location-select" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="City Of Schedule" name="city" options={CITIES_OPTIONS} id="city-select" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="Type Of Schedule" name="type" options={TYPES_OPTIONS} id="type-select" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="Time Of Schedule" name="time" options={TIMES_OPTIONS} id="time-select" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="Room Of Schedule" name="room" options={ROOMS_OPTIONS} id="room-select" />
        </Grid>
        <Grid item lg={1}>
          <Box mt={2}>
            <Button fullWidth size="large">
              <Search sx={{ marginInlineEnd: "5px" }} fontSize="small" />
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterScheduleForm;
