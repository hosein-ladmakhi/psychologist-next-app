import { Box, Grid } from "@mui/material";
import { TFilterScheduleFormFC, TFilterScheduleFormValidation } from "./index.type";
import DayPicker from "@/components/DayPicker";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { removeDuplicatedSelectKey } from "@/utils/selectOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterScheduleFormValidation } from "./index.constant";
import { useSearchParams } from "@/hooks/useSearchParams";
import { ILocation } from "@/types/location.model";
import { useEffect, useState } from "react";
import { getOwnScheduleFilteredData } from "@/services/therapist.service";
import { ETherapistScheduleType } from "@/types/therapist.model";

const FilterScheduleForm: TFilterScheduleFormFC = () => {
  const [generalLoading, setGeneralLoading] = useState<boolean>(false);
  const [locationFiltered, setLocationFiltered] = useState<ILocation[]>([]);
  const [roomsFiltered, setRoomsFiltered] = useState<number[]>([]);
  const [timesFiltered, setTimesFiltered] = useState<string[]>([]);

  useEffect(() => {
    setGeneralLoading(true);
    getOwnScheduleFilteredData()
      .then((filteredData) => {
        setLocationFiltered(filteredData.locations);
        setRoomsFiltered(filteredData.rooms);
        setTimesFiltered(filteredData.times);
      })
      .finally(() => {
        setGeneralLoading(false);
      });
  }, []);

  const { control, handleSubmit, reset } = useForm<TFilterScheduleFormValidation>({ resolver: zodResolver(filterScheduleFormValidation) });

  const { onChangeMultipleSearchParams } = useSearchParams();

  const LOCATIONS_OPTIONS = removeDuplicatedSelectKey(
    locationFiltered.map((location) => ({ key: `${location.city} ${location.address}`, value: location.id }))
  );
  const ROOMS_OPTIONS = roomsFiltered.map((room) => ({ key: `Room ${room}`, value: room }));

  const TIMES_OPTIONS = removeDuplicatedSelectKey(timesFiltered.map((time) => ({ key: time, value: time })));

  const TYPES_OPTIONS = Object.entries(ETherapistScheduleType).map(([key, value]) => ({ key, value }));

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
          <Select
            disabled={generalLoading}
            control={control}
            label="Location Of Schedule"
            name="location"
            options={LOCATIONS_OPTIONS}
            id="location-select"
          />
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
      </Grid>
    </Box>
  );
};

export default FilterScheduleForm;
