import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import FlexBox from "@/components/FlexBox";
import Select from "@/components/Select";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const FilterOrderForm: TFilterOrderFormFC = () => {
  const { control } = useForm();
  return (
    <Box component="form" mt={5}>
      <Grid container columnSpacing={1.5}>
        <Grid item lg={4}>
          <DatePicker control={control} label="Date Of Therapy Session" name="date" />
        </Grid>
        <Grid item lg={4}>
          <Select id="day-of-therapy" options={[]} control={control} label="Day Of Therapy Session" name="day" />
        </Grid>
        <Grid item lg={4}>
          <Select id="type-of-therapy" options={[]} control={control} label="How You Participate Therapy Session" name="type" />
        </Grid>
        <Grid item lg={4}>
          <Select id="patient-of-therapy" options={[]} control={control} label="The Patient Of Therapy" name="patient" />
        </Grid>
        <Grid item lg={4}>
          <Select id="time-of-therapy" options={[]} control={control} label="The Time Of Therapy" name="time" />
        </Grid>
        <Grid item lg={4}>
          <Select id="location-of-therapy" options={[]} control={control} label="The Location Of Therapy" name="location" />
        </Grid>
        <Grid item lg={6}>
          <Select id="category-of-therapy" options={[]} control={control} label="The Category Of Therapy" name="category" />
        </Grid>
        <Grid item lg={6}>
          <Select id="status-of-therapy" options={[]} control={control} label="The Status Of Therapy" name="status" />
        </Grid>
        <Grid item lg={2}>
          <FlexBox mt={2}>
            <Button fullWidth size="large">
              Find The Therapy Session
            </Button>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterOrderForm;
