'use client';

import { FC } from 'react';
import { ITherapistScheduleByTherapistIdScreenProps } from './index.type';
import { Box, Button, Typography } from '@mui/material';
import Table from '@/components/Table';
import { therapistScheduleColumns } from './index.constant';
import { calculateTotalPageTable } from '@/utils/calculateTotalPageTable';
import { DATES } from '@/constants';

const TherapistScheduleByTherapistIdScreen: FC<
  ITherapistScheduleByTherapistIdScreenProps
> = ({ schedules, schedulesCount, therapist, selectedDay }) => {
  return (
    <div>
      {schedulesCount === 0 && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>No Schedule Exist</Typography>
          <Button color="secondary">Create New Schedule</Button>
        </Box>
      )}
      {schedulesCount > 0 && (
        <Table
          rows={
            schedules?.map((schedule) => ({
              ...schedule,
              locationAddress: `${schedule.location?.city}-${schedule.location?.address}`,
            })) || []
          }
          columns={therapistScheduleColumns}
          dataKey="id"
          title={`${therapist?.firstName} ${therapist?.lastName} - ${
            (DATES as any)[selectedDay!]
          }`}
          currentPage={1}
          totalPage={calculateTotalPageTable(schedulesCount)}
          handleDelete={() => {}}
          handleCreate={() => {}}
          createButtonLabel="Create New Schedule"
        />
      )}
    </div>
  );
};

export default TherapistScheduleByTherapistIdScreen;
