"use client";

import Table from "@/components/Table";
import { TTherapistScheduleOffDayScreenFC } from "./index.type";
import { therapistScheduleOffDayColumns } from "./index.constant";
import { useMemo, useTransition } from "react";
import { DATES } from "@/constants";
import moment from "moment";
import { deleteDaysOffAction } from "@/app/(admin)/admin/therapists/off-day/[id]/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import AddNewOffDayDialog from "./components/AddNewOffDayDialog";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { ADD_NEW_OFF_DAY_DIALOG_SUBJECT } from "./components/AddNewOffDayDialog/index.constant";
import { useSearchParams } from "@/hooks/useSearchParams";
import FlexBox from "@/components/FlexBox";
import { Typography } from "@mui/material";
import Button from "@/components/Button";

const TherapistScheduleOffDayScreen: TTherapistScheduleOffDayScreenFC = ({ content, therapist, count, page }) => {
  const [pending, handleTransition] = useTransition();
  const { onChangeSearchParams } = useSearchParams();
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(openModal(ADD_NEW_OFF_DAY_DIALOG_SUBJECT));
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
    dispatch(closeModal());
  };

  const transformedData = useMemo(() => {
    return content.map((data) => ({
      ...data,
      day: (DATES as any)[data.schedule.day],
      time: `${data.schedule.startHour}_${data.schedule.endHour}`,
      type: data.schedule.type,
      location: `${data.schedule.location.city} - ${data.schedule.location.address}`,
      room: data.schedule.room,
      date: moment(data.date).format("YYYY-MM-DD"),
    }));
  }, [content]);

  const therapistFullName = therapist?.firstName + " " + therapist?.lastName;

  return (
    <>
      <AddNewOffDayDialog onClose={onCloseDialog} therapist={therapist} />
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
