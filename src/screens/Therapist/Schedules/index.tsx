"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TSchedulesScreenFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import { getDate } from "@/utils/getDate";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const FilterScheduleForm = dynamic(() => import("./components/FilterScheduleForm"));

const SchedulesScreen: TSchedulesScreenFC = ({ content }) => {
  const [isShowFilterScheduleForm, setShowFilterScheduleForm] = useState<boolean>(false);
  const handleShowFilterScheduleForm = () => setShowFilterScheduleForm((prevState) => !prevState);

  return (
    <>
      <FlexBox justifyContent="space-between">
        <Typography variant="h5" component="h1" fontWeight="bold">
          The Work Schedules That You Created ...
        </Typography>
        <FlexBox justifyContent="flex-start" gap={1}>
          <Button onClick={handleShowFilterScheduleForm}>{isShowFilterScheduleForm ? "Close" : "Open"} Filter</Button>
          <Button>Create New Schedule</Button>
        </FlexBox>
      </FlexBox>
      {isShowFilterScheduleForm && (
        <Suspense fallback={<></>}>
          <FilterScheduleForm schedules={content} />
        </Suspense>
      )}

      <Grid my={3} container spacing={3}>
        {content.map((schedule) => (
          <Grid key={schedule.id} item lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Day : {getDate(schedule.day)}</Typography>
                <Typography variant="h6">
                  Time : {schedule.startHour}_{schedule.endHour}
                </Typography>
                <Typography variant="h6">
                  Address : {schedule.location.city} {schedule.location.address}
                </Typography>
                <Typography variant="h6">Room : {schedule.room}</Typography>
                <Typography variant="h6">Session Type : {schedule.type}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SchedulesScreen;
