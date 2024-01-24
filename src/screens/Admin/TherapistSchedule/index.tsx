"use client";

import { TTherapistScheduleByTherapistIdScreenFC } from "./index.type";
import { Box, Button, Typography } from "@mui/material";
import Table from "@/components/Table";
import { therapistScheduleColumns } from "./index.constant";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { DATES } from "@/constants";
import { useMemo } from "react";
import CreateNewSchedule from "./components/CreateNewSchedule";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlices";
import { CREATE_NEW_SCHEDULE_SUBJECT } from "./components/CreateNewSchedule/index.constant";

const TherapistScheduleByTherapistIdScreen: TTherapistScheduleByTherapistIdScreenFC = ({ schedules, schedulesCount, therapist, selectedDay }) => {
  const dispatch = useDispatch();

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

  return (
    <div>
      {schedulesCount === 0 && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>No Schedule Exist</Typography>
          <Button color="secondary">Create New Schedule</Button>
        </Box>
      )}

      <CreateNewSchedule therapist={therapist} day={selectedDay} dayText={selectedDayText} />

      {schedulesCount > 0 && (
        <Table
          rows={transformedSchedule}
          columns={therapistScheduleColumns}
          dataKey="id"
          title={`${therapist?.firstName} ${therapist?.lastName} - ${selectedDayText}`}
          currentPage={1}
          totalPage={calculateTotalPageTable(schedulesCount)}
          handleDelete={() => {}}
          handleCreate={handleCreate}
          createButtonLabel="Create New Schedule"
        />
      )}
    </div>
  );
};

export default TherapistScheduleByTherapistIdScreen;
