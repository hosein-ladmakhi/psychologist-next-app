"use client";

import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { TSchedulesScreenFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import { getDate } from "@/utils/getDate";
import dynamic from "next/dynamic";
import { Suspense, useState, useTransition } from "react";
import CreateScheduleForm from "./components/CreateScheduleForm";
import { Delete } from "@mui/icons-material";
import { deleteOwnScheduleAction } from "@/app/(therapist)/therapist/schedules/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { useConfirm } from "material-ui-confirm";
import { useSearchParams } from "@/hooks/useSearchParams";

const FilterScheduleForm = dynamic(() => import("./components/FilterScheduleForm"));

const SchedulesScreen: TSchedulesScreenFC = ({ content }) => {
  const [loading, handleTransition] = useTransition();
  const { onChangeMultipleSearchParams } = useSearchParams();
  const confirmation = useConfirm();

  const [isShowFilterScheduleForm, setShowFilterScheduleForm] = useState<boolean>(false);
  const handleShowFilterScheduleForm = () => setShowFilterScheduleForm((prevState) => !prevState);

  const [isShowCreateScheduleForm, setShowCreateScheduleForm] = useState<boolean>(false);
  const handleShowCreateScheduleForm = () => setShowCreateScheduleForm((prevState) => !prevState);

  const handleDelete = (id: number) => {
    confirmation({ title: "Are You Sure To Delete" }).then(() => {
      handleTransition(async () => {
        const res = await deleteOwnScheduleAction(id);
        if (res) successNotify("Delete Schedule Successfully ...");
        else errorNotify("Unable To Delete");
      });
    });
  };

  const handleReset = () => {
    setShowFilterScheduleForm(false);
    onChangeMultipleSearchParams({
      day: undefined,
      location: undefined,
      room: undefined,
      type: undefined,
      time: undefined,
    });
  };

  return (
    <>
      <FlexBox justifyContent="space-between">
        <Typography variant="h5" component="h1" fontWeight="bold">
          The Work Schedules That You Created ...
        </Typography>
        <FlexBox justifyContent="flex-start" gap={1}>
          <Button onClick={handleShowFilterScheduleForm}>{isShowFilterScheduleForm ? "Close" : "Open"} Filter</Button>
          <Button onClick={handleReset}>Reset Filter</Button>
          <Button onClick={handleShowCreateScheduleForm}>Create New Schedule</Button>
        </FlexBox>
      </FlexBox>
      {isShowFilterScheduleForm && (
        <Suspense fallback={<></>}>
          <FilterScheduleForm handleClose={handleShowFilterScheduleForm} />
        </Suspense>
      )}

      {isShowCreateScheduleForm && (
        <Suspense fallback={<></>}>
          <CreateScheduleForm handleClose={handleShowCreateScheduleForm} />
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
                <FlexBox justifyContent="flex-end">
                  <IconButton onClick={handleDelete.bind(null, schedule.id)}>
                    <Delete />
                  </IconButton>
                </FlexBox>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SchedulesScreen;
