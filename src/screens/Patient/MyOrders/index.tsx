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

const MyOrdersScreen: TMyOrdersScreenFC = ({ orders }) => {
  const { control } = useForm();
  const transformedData = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      transformedDay: getDate(order.day),
      transformedTherapist: order.therapist.firstName + " " + order.therapist.lastName,
    }));
  }, [orders]);

  const SELECT_MODE_OPTIONS: TSelectOptions[] = [
    {
      key: "All Reservations",
      value: "",
    },
    {
      key: "Today Reservations",
      value: "day",
    },
    {
      key: "This Week Reservations",
      value: "week",
    },
    {
      key: "This Month Reservations",
      value: "month",
    },
  ];

  const SELECT_THERAPIST_OPTIONS: TSelectOptions[] = removeDuplicatedSelectKey(
    orders.map((order) => ({
      key: order.therapist.firstName + " " + order.therapist.lastName,
      value: order.therapist.id,
    }))
  );

  return (
    <>
      <form>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Select control={control} id="select-mode" label="How do you want to see your reservation" name="mode" options={SELECT_MODE_OPTIONS} />
          </Grid>
          <Grid item md={4}>
            <DayPicker control={control} label="Select day that you want to filter" name="day" />
          </Grid>
          <Grid item md={4}>
            <Select
              control={control}
              id="select-therapist"
              label="Which therapist do you want to filter"
              name="therapist"
              options={SELECT_THERAPIST_OPTIONS}
            />
          </Grid>
          <Grid item md={1}>
            <Button fullWidth>Submit</Button>
          </Grid>
        </Grid>
      </form>
      <Table columns={myOrdersColumns} dataKey="id" rows={transformedData} />
    </>
  );
};

export default MyOrdersScreen;
