"use client";

import { TTherapistScheduleByTherapistIdScreenFC } from "./index.type";
import { Box, Button, Typography } from "@mui/material";
import Table from "@/components/Table";
import { therapistScheduleColumns } from "./index.constant";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { DATES } from "@/constants";
import { useMemo, useTransition } from "react";
import CreateNewSchedule from "./components/CreateNewSchedule";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { CREATE_NEW_SCHEDULE_SUBJECT } from "./components/CreateNewSchedule/index.constant";
import { deleteScheduleByIdAction } from "@/app/(admin)/admin/therapists/schedules/[therapistId]/[day]/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import FlexBox from "@/components/FlexBox";

const TherapistScheduleByTherapistIdScreen: TTherapistScheduleByTherapistIdScreenFC = ({ schedules, schedulesCount, therapist, selectedDay }) => {
  const dispatch = useDispatch();
  const [pending, handleTransition] = useTransition();

  const selectedDayText = (DATES as any)[selectedDay!];

  const transformedSchedule = useMemo(() => {
    return schedulesCount === 0
      ? []
      : schedules?.map((schedule) => ({
          ...schedule,
          locationAddress: `${schedule.location?.city}-${schedule.location?.address}`,
        })) || [];
  }, [schedules, schedulesCount]);

  const handleCreate = () => {
    dispatch(openModal(CREATE_NEW_SCHEDULE_SUBJECT));
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = (selectedSchedule: any) => {
    handleTransition(async () => {
      const res = await deleteScheduleByIdAction(selectedSchedule?.id);
      if (res) successNotify("This schedule deleted successfully ...");
      else errorNotify("This schedule delete process has failed ...");
      onClose();
    });
  };

  return (
    <div>
      {schedulesCount === 0 && (
        <FlexBox justifyContent="space-between">
          <Typography variant="body1" component="h1" fontWeight="bold">
            No Schedule Exist
          </Typography>
          <Button disabled={pending} onClick={handleCreate} color="secondary">
            Create New Schedule
          </Button>
        </FlexBox>
      )}

      <CreateNewSchedule onClose={onClose} therapist={therapist} day={selectedDay} dayText={selectedDayText} />

      {schedulesCount > 0 && (
        <Table
          rows={transformedSchedule}
          columns={therapistScheduleColumns}
          dataKey="id"
          title={`${therapist?.firstName} ${therapist?.lastName} - ${selectedDayText}`}
          currentPage={1}
          totalPage={calculateTotalPageTable(schedulesCount)}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
          createButtonLabel="Create New Schedule"
          loading={pending}
        />
      )}
    </div>
  );
};

export default TherapistScheduleByTherapistIdScreen;
