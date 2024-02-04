"use client";

import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { TOrdersScreenFC } from "./index.type";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import { getDate } from "@/utils/getDate";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useRouter } from "next/navigation";

const FilterOrderForm = dynamic(() => import("./components/FilterOrderForm"));

const OrdersScreen: TOrdersScreenFC = ({ data, todayOrders }) => {
  const [isShowFilterOrderForm, setShowFilterOrderForm] = useState<boolean>(false);
  const handleFilterOrderForm = () => setShowFilterOrderForm((prev) => !prev);
  const { onChangeSearchParams, getSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const router = useRouter();
  const content = getSearchParams("mode") === "today" ? todayOrders : data;
  const handleChangeMode = (mode: "all" | "today") => onChangeSearchParams("mode", mode);

  const handleViewOrder = (id: number) => router.push(`/therapist/orders/${id}`);

  const handleReset = () => {
    onChangeMultipleSearchParams({
      category: undefined,
      date: undefined,
      day: undefined,
      location: undefined,
      patient: undefined,
      status: undefined,
      time: undefined,
      type: undefined,
    });
    setShowFilterOrderForm(false);
  };

  return (
    <>
      <FlexBox justifyContent="space-between">
        <Typography fontWeight="bold" variant="h5" component="h1">
          Welcome To Orders Section, Today You Have {todayOrders.length} Therapy Session
        </Typography>
        <FlexBox gap={0.5}>
          <Button onClick={handleFilterOrderForm}>{isShowFilterOrderForm ? "Close" : "Open"} Filter</Button>
          <Button onClick={handleReset}>Reset Filter</Button>
          <Button onClick={handleChangeMode.bind(null, "today")}>Show Today Therapy Session</Button>
          <Button onClick={handleChangeMode.bind(null, "all")}>Show All Therpy Session</Button>
        </FlexBox>
      </FlexBox>
      {isShowFilterOrderForm && (
        <Suspense fallback={<></>}>
          <FilterOrderForm handleClose={handleFilterOrderForm} therapistId={1} />
        </Suspense>
      )}
      <Grid my={4} container spacing={3}>
        {content.map((order) => (
          <Grid key={order.id} item lg={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  Patient : {order.patient.firstName} {order.patient.lastName}
                </Typography>
                <Typography variant="body1">Phone : {order.patient.phone}</Typography>
                <Typography variant="body1">Date : {moment(order.date).format(APP_DATE_FORMAT)}</Typography>
                <Typography variant="body1">Day : {getDate(order.day)}</Typography>
                <Typography variant="body1">
                  Time : {order.startHour}_{order.endHour}
                </Typography>
                <Typography variant="body1">Location : {order.address}</Typography>
                <FlexBox justifyContent="flex-start" gap={0.2} mt={2} mb={5}>
                  {order.categories.map((category) => (
                    <Chip size="small" label={category.enName} key={category.enName} />
                  ))}
                </FlexBox>
                <Button onClick={handleViewOrder.bind(null, order.id)} fullWidth color="secondary" size="large">
                  View Detail
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OrdersScreen;
