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

const FilterOrderForm = dynamic(() => import("./components/FilterOrderForm"));

const OrdersScreen: TOrdersScreenFC = ({ count, data, totalPageCount }) => {
  const [isShowFilterOrderForm, setShowFilterOrderForm] = useState<boolean>(false);
  const handleFilterOrderForm = () => setShowFilterOrderForm((prev) => !prev);

  return (
    <>
      <FlexBox justifyContent="space-between">
        <Typography fontWeight="bold" variant="h5" component="h1">
          Welcome To Orders Section, Today You Have 3 Therapy Session
        </Typography>
        <Button onClick={handleFilterOrderForm}>{isShowFilterOrderForm ? "Close" : "Open"} Filter</Button>
      </FlexBox>
      {isShowFilterOrderForm && (
        <Suspense fallback={<></>}>
          <FilterOrderForm />
        </Suspense>
      )}
      <Grid my={4} container spacing={3}>
        {data.map((order) => (
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
                <Button fullWidth color="secondary" size="large">
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
