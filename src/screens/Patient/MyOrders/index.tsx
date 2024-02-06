"use client";

import Table from "@/components/Table";
import { TMyOrdersScreenFC } from "./index.type";
import { myOrdersColumns } from "./index.constant";
import { useMemo } from "react";
import { getDate } from "@/utils/getDate";
import Select from "@/components/Select";
import { useForm } from "react-hook-form";
import { TSelectOptions } from "@/types/base.model";
import DayPicker from "@/components/DayPicker";
import { removeDuplicatedSelectKey } from "@/utils/selectOptions";
import { Grid } from "@mui/material";
import Button from "@/components/Button";
import { useSearchParams } from "@/hooks/useSearchParams";
import DatePicker from "@/components/DatePicker";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import { EOrderStatus } from "@/types/order.model";

const MyOrdersScreen: TMyOrdersScreenFC = ({ orders }) => {
  const { control, handleSubmit, reset } = useForm({ defaultValues: { date: moment() } });
  const { onChangeMultipleSearchParams } = useSearchParams();

  const onSubmit = handleSubmit((data) => {
    onChangeMultipleSearchParams({ ...data, date: moment(data.date).isValid() ? moment(data.date).format(APP_DATE_FORMAT) : undefined });
  });

  const onReset = () => {
    onChangeMultipleSearchParams({
      date: undefined,
      day: undefined,
      therapist: undefined,
      status: undefined,
    });
    reset();
  };

  const SELECT_THERAPIST_OPTIONS: TSelectOptions[] = removeDuplicatedSelectKey(
    orders.map((order) => ({
      key: order.therapist.firstName + " " + order.therapist.lastName,
      value: order.therapist.id,
    }))
  );

  const SELECT_STATUS_OPTIONS: TSelectOptions[] = Object.entries(EOrderStatus).map(([key, value]) => ({ key, value }));

  const transformedData = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      transformedDay: getDate(order.day),
      transformedTherapist: order.therapist.firstName + " " + order.therapist.lastName,
    }));
  }, [orders]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <DatePicker control={control} label="Which Date You Want" name="date" />
          </Grid>
          <Grid item md={3}>
            <DayPicker control={control} label="Select day that you want to filter" name="day" />
          </Grid>
          <Grid item md={3}>
            <Select
              control={control}
              id="select-therapist"
              label="Which therapist do you want to filter"
              name="therapist"
              options={SELECT_THERAPIST_OPTIONS}
            />
          </Grid>
          <Grid item md={3}>
            <Select control={control} id="select-status" label="Choose Your Reservation Status" name="status" options={SELECT_STATUS_OPTIONS} />
          </Grid>
          <Grid item md={1}>
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item md={1}>
            <Button onClick={onReset} fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      <Table columns={myOrdersColumns} dataKey="id" rows={transformedData} />
    </>
  );
};

export default MyOrdersScreen;
