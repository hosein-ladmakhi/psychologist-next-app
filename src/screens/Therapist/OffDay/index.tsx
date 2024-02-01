"use client";

import FlexBox from "@/components/FlexBox";
import { TOffDayScheduleScreenFC } from "./index.type";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Button from "@/components/Button";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import { getDate } from "@/utils/getDate";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const FilterDayOffForm = dynamic(() => import("./components/FilterDayOffForm"));

const OffDayScheduleScreen: TOffDayScheduleScreenFC = ({ content }) => {
  const [isShowFilterDayOffForm, setShowFilterDayOffForm] = useState<boolean>(false);
  const handleShowFilterDayOffForm = () => setShowFilterDayOffForm((prev) => !prev);

  return (
    <>
      <FlexBox justifyContent="space-between">
        <Typography variant="h5" component="h1" fontWeight="bold">
          The Days Off Schedule Work Shift
        </Typography>
        <FlexBox justifyContent="flex-start" gap={1}>
          <Button onClick={handleShowFilterDayOffForm}>{isShowFilterDayOffForm ? "Close" : "Open"} Filter</Button>
          <Button>Create New Days Off</Button>
        </FlexBox>
      </FlexBox>

      {isShowFilterDayOffForm && (
        <Suspense fallback={<></>}>
          <FilterDayOffForm />
        </Suspense>
      )}

      <Grid my={3} container spacing={3}>
        {content.map((daysOff) => (
          <Grid key={daysOff.id} item lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Date : {moment(daysOff.date).format(APP_DATE_FORMAT)}</Typography>
                <Typography variant="h6">Day : {getDate(daysOff.schedule.day)}</Typography>
                <Typography variant="h6">
                  Time : {daysOff.schedule.startHour}_{daysOff.schedule.endHour}
                </Typography>
                <Typography variant="h6">Type : {daysOff.schedule.type}</Typography>
                <Typography variant="h6">
                  Location : {daysOff.schedule.location.city} {daysOff.schedule.location.address} - Room {daysOff.schedule.room}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OffDayScheduleScreen;
