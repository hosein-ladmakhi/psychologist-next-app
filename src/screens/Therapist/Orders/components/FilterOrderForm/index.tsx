import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import FlexBox from "@/components/FlexBox";
import Select from "@/components/Select";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { TFilterOrderFormFC, TFilterOrderFormValidation } from "./index.type";
import DayPicker from "@/components/DayPicker";
import { TSelectOptions } from "@/types/base.model";
import { useEffect, useState } from "react";
import { IPatient } from "@/types/patient.model";
import { getOrderPatientByTherapistId } from "@/services/order.service";
import { ICategory } from "@/types/category.model";
import { orderLocationSelects, orderStatusSelects, orderTypeSelects, patientsSelects } from "@/utils/selectOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterOrderFormValidation } from "./index.constant";
import { useSearchParams } from "@/hooks/useSearchParams";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";

const FilterOrderForm: TFilterOrderFormFC = ({ therapistId, handleClose }) => {
  const { control, handleSubmit, reset } = useForm<TFilterOrderFormValidation>({ resolver: zodResolver(filterOrderFormValidation) });
  const [loading, setLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { onChangeMultipleSearchParams } = useSearchParams();

  const THERAPY_TYPE_OPTIONS: TSelectOptions[] = orderTypeSelects();
  const PATIENTS_OPTIONS: TSelectOptions[] = patientsSelects(patients);
  const LOCATIONS_OPTIONS: TSelectOptions[] = orderLocationSelects(locations);
  const TIMES_OPTIONS: TSelectOptions[] = times.map((time) => ({ key: time, value: time }));
  const CATEGORIES_OPTIONS: TSelectOptions[] = categories.map((category) => ({ key: category.enName, value: category.enName }));
  const STATUS_OPTIONS: TSelectOptions[] = orderStatusSelects();

  useEffect(() => {
    setLoading(true);
    getOrderPatientByTherapistId(therapistId)
      .then((data) => {
        setPatients(data.patients);
        setTimes(data.times);
        setLocations(data.locations);
        setCategories(data.categories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [therapistId]);

  const handleResetForm = () => {
    reset();
    const resetedData: TFilterOrderFormValidation = {
      category: undefined,
      date: undefined,
      day: undefined,
      location: undefined,
      patient: undefined,
      status: undefined,
      time: undefined,
      type: undefined,
    };
    onChangeMultipleSearchParams(resetedData);
    handleClose();
  };

  const onSubmit = handleSubmit((data) => {
    onChangeMultipleSearchParams({ ...data, date: data.date ? moment(data.date).format(APP_DATE_FORMAT) : undefined });
  });

  return (
    <Box onSubmit={onSubmit} component="form" mt={5}>
      <Grid container columnSpacing={1.5}>
        <Grid item lg={4}>
          <DatePicker control={control} label="Date Of Therapy Session" name="date" />
        </Grid>
        <Grid item lg={4}>
          <DayPicker control={control} label="Day Of Therapy Session" name="day" />
        </Grid>
        <Grid item lg={4}>
          <Select id="type-of-therapy" options={THERAPY_TYPE_OPTIONS} control={control} label="How You Participate Therapy Session" name="type" />
        </Grid>
        <Grid item lg={4}>
          <Select
            disabled={loading}
            id="patient-of-therapy"
            options={PATIENTS_OPTIONS}
            control={control}
            label="The Patient Of Therapy"
            name="patient"
          />
        </Grid>
        <Grid item lg={4}>
          <Select disabled={loading} id="time-of-therapy" options={TIMES_OPTIONS} control={control} label="The Time Of Therapy" name="time" />
        </Grid>
        <Grid item lg={4}>
          <Select
            id="location-of-therapy"
            disabled={loading}
            options={LOCATIONS_OPTIONS}
            control={control}
            label="The Location Of Therapy"
            name="location"
          />
        </Grid>
        <Grid item lg={6}>
          <Select
            id="category-of-therapy"
            disabled={loading}
            options={CATEGORIES_OPTIONS}
            control={control}
            label="The Category Of Therapy"
            name="category"
          />
        </Grid>
        <Grid item lg={6}>
          <Select id="status-of-therapy" disabled={loading} options={STATUS_OPTIONS} control={control} label="The Status Of Therapy" name="status" />
        </Grid>
        <Grid item lg={2}>
          <FlexBox mt={2}>
            <Button type="submit" disabled={loading} fullWidth size="large">
              Find The Therapy Session
            </Button>
          </FlexBox>
        </Grid>
        <Grid item lg={2}>
          <FlexBox mt={2}>
            <Button type="button" onClick={handleResetForm} disabled={loading} fullWidth size="large">
              Reset The Filter
            </Button>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterOrderForm;
