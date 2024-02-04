"use client";

import FlexBox from "@/components/FlexBox";
import { TOffDayScheduleScreenFC } from "./index.type";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import Button from "@/components/Button";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import { getDate } from "@/utils/getDate";
import dynamic from "next/dynamic";
import { Suspense, useState, useTransition } from "react";
import CreateDayOffDialog from "./components/CreateDayOffDialog";
import { Delete } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import { deleteOwnDaysOffByIdAction } from "@/app/(therapist)/therapist/off-day/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { useSearchParams } from "@/hooks/useSearchParams";

const FilterDayOffForm = dynamic(() => import("./components/FilterDayOffForm"));

const OffDayScheduleScreen: TOffDayScheduleScreenFC = ({ content }) => {
  const [pending, handleTransition] = useTransition();
  const confirmation = useConfirm();
  const { onChangeMultipleSearchParams } = useSearchParams();

  const [isShowFilterDayOffForm, setShowFilterDayOffForm] = useState<boolean>(false);
  const handleShowFilterDayOffForm = () => setShowFilterDayOffForm((prev) => !prev);

  const [isShowCreateDayOffForm, setShowCreateDayOffForm] = useState<boolean>(false);
  const handleShowCreateDayOffForm = () => setShowCreateDayOffForm((prev) => !prev);

  const handleDelete = (id: number) => {
    confirmation({ title: "Are You Sure To Delete ?" }).then(() => {
      handleTransition(async () => {
        const res = await deleteOwnDaysOffByIdAction(id);
        if (res) successNotify("Delete Successfully ...");
        else errorNotify("Unable To Delete ...");
      });
    });
  };

  const handleReset = () => {
    onChangeMultipleSearchParams({
      day: undefined,
      date: undefined,
    });
    setShowFilterDayOffForm(false);
  };

  return (
    <>
      <FlexBox justifyContent="space-between">
        <Typography variant="h5" component="h1" fontWeight="bold">
          The Days Off Schedule Work Shift
        </Typography>
        <FlexBox justifyContent="flex-start" gap={1}>
          <Button onClick={handleShowFilterDayOffForm}>{isShowFilterDayOffForm ? "Close" : "Open"} Filter</Button>
          <Button onClick={handleReset}>Reset Filter</Button>
          <Button onClick={handleShowCreateDayOffForm}>Create New Days Off</Button>
        </FlexBox>
      </FlexBox>

      {isShowFilterDayOffForm && (
        <Suspense fallback={<></>}>
          <FilterDayOffForm onClose={handleShowFilterDayOffForm} />
        </Suspense>
      )}

      {isShowCreateDayOffForm && (
        <Suspense fallback={<></>}>
          <CreateDayOffDialog offDays={content} onClose={handleShowCreateDayOffForm} />
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

                <FlexBox justifyContent="flex-end">
                  <IconButton onClick={handleDelete.bind(null, daysOff.id)}>
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

export default OffDayScheduleScreen;
