import Modal from '@/components/Modal';
import { FC, useEffect, useState } from 'react';
import { SCHEDULE_THERAPIST_DIALOG_SUBJECT } from './index.constant';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { IScheduleTherapistDialogProps } from './index.type';
import { TTherapistSchedulesResPerDay } from '@/types/therapist.model';
import { getSchedulesTherapistPerDay } from '@/services/therapist.service';
import { useRouter } from 'next/navigation';
import { DATES } from '@/constants';

const ScheduleTherapistDialog: FC<IScheduleTherapistDialogProps> = ({
  selectedTherapist,
  onClose,
}) => {
  const [schedules, setSchedules] = useState<TTherapistSchedulesResPerDay[]>(
    [],
  );
  const router = useRouter();
  const [schedulesLoading, setSchedulesLoading] = useState<boolean>(false);
  const onSelectDay = (day: number) => {
    router.push(`/admin/therapists/schedules/${selectedTherapist?.id}/${day}`);
    onClose();
  };

  useEffect(() => {
    if (selectedTherapist?.id) {
      setSchedulesLoading(true);
      getSchedulesTherapistPerDay(selectedTherapist?.id)
        .then((data) => {
          setSchedules(data);
        })
        .finally(() => {
          setSchedulesLoading(false);
        });
    }
  }, [selectedTherapist?.id]);

  return (
    <Modal
      size="xxxl"
      subject={SCHEDULE_THERAPIST_DIALOG_SUBJECT}
      title="Schedules Of Therapist"
    >
      {schedulesLoading && (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={6}
          flexDirection="column"
        >
          <CircularProgress />
          <Typography mt={2} variant="body1" component="h1">
            Loading Schedules ...
          </Typography>
        </Box>
      )}
      <Grid container spacing={1}>
        {Object.keys(DATES).map((dateKey) => {
          const transformedSchedule = schedules.find(
            (element) => element.day === +dateKey,
          );
          return (
            <Grid item lg={4} key={dateKey}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h1">
                    {(DATES as any)[dateKey]}
                  </Typography>
                  <Typography variant="body1">
                    Schedules Count : {transformedSchedule?.items?.length || 0}
                  </Typography>
                  <Box mt={4}>
                    <Button
                      onClick={onSelectDay.bind(null, +dateKey)}
                      color="secondary"
                      fullWidth
                    >
                      See Schedule
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Modal>
  );
};

export default ScheduleTherapistDialog;
