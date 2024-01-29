"use client";

import Table from "@/components/Table";
import { TTherapistScheduleOffDayScreenFC } from "./index.type";
import { therapistScheduleOffDayColumns } from "./index.constant";
import { Suspense, useMemo, useState, useTransition } from "react";
import moment from "moment";
import { deleteDaysOffAction } from "@/app/(admin)/admin/therapists/off-day/[id]/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { useSearchParams } from "@/hooks/useSearchParams";
import FlexBox from "@/components/FlexBox";
import { Typography } from "@mui/material";
import Button from "@/components/Button";
import dynamic from "next/dynamic";
import { getDate } from "@/utils/getDate";
import { APP_DATE_FORMAT } from "@/constants";

const AddNewOffDayDialog = dynamic(() => import("./components/AddNewOffDayDialog"));

const TherapistScheduleOffDayScreen: TTherapistScheduleOffDayScreenFC = ({ content, therapist, count, page }) => {
  const [pending, handleTransition] = useTransition();
  const { onChangeSearchParams } = useSearchParams();
  const [isShowAddOffDayDialog, setShowAddOffDayDialogStatus] = useState<boolean>(false);

  const handleCreate = () => {
    setShowAddOffDayDialogStatus(true);
  };

  const handleDelete = (data: any) => {
    handleTransition(async () => {
      const res = await deleteDaysOffAction(data.id);
      if (res) successNotify("Deleted Successfully ...");
      else errorNotify("Unable To Delete ...");
    });
  };

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  const onCloseDialog = () => {
    setShowAddOffDayDialogStatus(false);
  };

  const transformedData = useMemo(() => {
    return content.map((data) => ({
      ...data,
      day: getDate(data.schedule.day),
      time: `${data.schedule.startHour}_${data.schedule.endHour}`,
      type: data.schedule.type,
      location: `${data.schedule.location.city} - ${data.schedule.location.address}`,
      room: data.schedule.room,
      date: moment(data.date).format(APP_DATE_FORMAT),
    }));
  }, [content]);

  const therapistFullName = therapist?.firstName + " " + therapist?.lastName;

  return (
    <>
      {isShowAddOffDayDialog && (
        <Suspense fallback={<></>}>
          <AddNewOffDayDialog onClose={onCloseDialog} therapist={therapist} />
        </Suspense>
      )}
      {count === 0 && (
        <FlexBox justifyContent="space-between">
          <Typography variant="body1" component="h1" fontWeight="bold">
            No Days Off Schedule Exist
          </Typography>
          <Button disabled={pending} onClick={handleCreate} color="secondary">
            Create New Days Off
          </Button>
        </FlexBox>
      )}

      {count > 0 && (
        <Table
          createButtonLabel="Add New Days Off"
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          columns={therapistScheduleOffDayColumns}
          rows={transformedData}
          title={`${therapistFullName} Days Off`}
          dataKey="id"
          currentPage={page}
          totalPage={count}
          handleChangePage={handleChangePage}
          loading={pending}
        />
      )}
    </>
  );
};

export default TherapistScheduleOffDayScreen;
