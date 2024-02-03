import { Box, Grid } from "@mui/material";
import { TFilterScheduleFormFC, TFilterScheduleFormValidation } from "./index.type";
import DayPicker from "@/components/DayPicker";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { scheduleLocationSelects, scheduleRoomSelects, scheduleTypesSelects } from "@/utils/selectOptions";
import { TSelectOptions } from "@/types/base.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterScheduleFormValidation } from "./index.constant";
import { useSearchParams } from "@/hooks/useSearchParams";

const FilterScheduleForm: TFilterScheduleFormFC = ({ schedules, handleClose }) => {
  const { control, handleSubmit, reset } = useForm<TFilterScheduleFormValidation>({ resolver: zodResolver(filterScheduleFormValidation) });
  const { onChangeMultipleSearchParams } = useSearchParams();

  const LOCATIONS_OPTIONS = scheduleLocationSelects(schedules);

  const ROOMS_OPTIONS = scheduleRoomSelects(schedules);

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

  const handleResetForm = () => {
    onChangeMultipleSearchParams({
      day: undefined,
      location: undefined,
      room: undefined,
      type: undefined,
      time: undefined,
    });
    handleClose();
    reset();
  };

  const onSubmit = handleSubmit((data) => {
    onChangeMultipleSearchParams(data);
  });

  return (
    <Box onSubmit={onSubmit} component="form" mt={5}>
      <Grid container columnSpacing={1.5}>
        <Grid item lg={4}>
          <DayPicker control={control} label="Day Of Schedule" name="day" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="Location Of Schedule" name="location" options={LOCATIONS_OPTIONS} id="location-select" />
        </Grid>
        <Grid item lg={4}>
          <Select control={control} label="Type Of Schedule" name="type" options={TYPES_OPTIONS} id="type-select" />
        </Grid>
        <Grid item lg={6}>
          <Select control={control} label="Time Of Schedule" name="time" options={TIMES_OPTIONS} id="time-select" />
        </Grid>
        <Grid item lg={6}>
          <Select control={control} label="Room Of Schedule" name="room" options={ROOMS_OPTIONS} id="room-select" />
        </Grid>
        <Grid item lg={1}>
          <Box mt={2}>
            <Button type="submit" fullWidth size="large">
              <Search sx={{ marginInlineEnd: "5px" }} fontSize="small" />
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item lg={1}>
          <Box mt={2}>
            <Button type="button" onClick={handleResetForm} fullWidth size="large">
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterScheduleForm;
