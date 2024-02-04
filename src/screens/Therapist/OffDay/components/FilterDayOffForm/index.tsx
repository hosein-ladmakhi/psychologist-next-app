import { Box, Grid } from "@mui/material";
import { TFilterDayOffFormFC, TFilterDayOffFormValidation } from "./index.type";
import Button from "@/components/Button";
import { Search } from "@mui/icons-material";
import DatePicker from "@/components/DatePicker";
import { useForm } from "react-hook-form";
import DayPicker from "@/components/DayPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterDayOffFormValidation } from "./index.constant";
import { useSearchParams } from "@/hooks/useSearchParams";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";

const FilterDayOffForm: TFilterDayOffFormFC = ({ onClose }) => {
  const { control, handleSubmit, reset } = useForm<TFilterDayOffFormValidation>({ resolver: zodResolver(filterDayOffFormValidation) });
  const { onChangeMultipleSearchParams } = useSearchParams();

  const onSubmit = handleSubmit((data) => {
    onChangeMultipleSearchParams({ ...data, date: data.date ? moment(data.date).format(APP_DATE_FORMAT) : undefined });
  });

  return (
    <Box onSubmit={onSubmit} component="form" mt={5}>
      <Grid container columnSpacing={1.5}>
        <Grid item lg={6}>
          <DatePicker control={control} label="Date" name="date" />
        </Grid>
        <Grid item lg={6}>
          <DayPicker control={control} label="Day" name="day" />
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

export default FilterDayOffForm;
