import { Box, Grid } from "@mui/material";
import { TFilterDayOffFormFC } from "./index.type";
import Button from "@/components/Button";
import { Search } from "@mui/icons-material";
import DatePicker from "@/components/DatePicker";
import { useForm } from "react-hook-form";
import DayPicker from "@/components/DayPicker";

const FilterDayOffForm: TFilterDayOffFormFC = () => {
  const { control } = useForm();
  return (
    <Box component="form" mt={5}>
      <Grid container columnSpacing={1.5}>
        <Grid item lg={6}>
          <DatePicker control={control} label="Date" name="date" />
        </Grid>
        <Grid item lg={6}>
          <DayPicker control={control} label="Day" name="day" />
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

export default FilterDayOffForm;
