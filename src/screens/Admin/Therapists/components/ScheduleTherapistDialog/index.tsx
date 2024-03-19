import Modal from "@/components/Modal";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { TScheduleTherapistDialogFC } from "./index.type";
import { useRouter } from "next/navigation";
import { DATES, DATES_KEY } from "@/constants";
import LoadingText from "@/components/LoadingText";
import Button from "@/components/Button";
import { getDate } from "@/utils/getDate";
import useTherapistSchedulePerday from "@/hooks/api/useTherapistSchedulePerday";

const ScheduleTherapistDialog: TScheduleTherapistDialogFC = ({ selectedTherapist, onClose }) => {
  const { schedules, schedulesLoading } = useTherapistSchedulePerday(selectedTherapist?.id!);
  const router = useRouter();
  const onSelectDay = (day: number) => {
    router.push(`/admin/therapists/schedules/${selectedTherapist?.id}/${day}`);
    onClose();
  };

  return (
    <Modal size="xxxl" opened handleClose={onClose} title="چارت رزرو های این پزشک">
      <LoadingText loading={schedulesLoading} loadingText="درحال بارگزاری چارت" loadingTextVariant="body1" spinnerSize="30px" />
      <Grid container spacing={1}>
        {DATES_KEY.map((dateKey) => {
          const transformedSchedule = schedules.find((element) => element.day === +dateKey);
          return (
            <Grid item lg={4} key={dateKey}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h1">
                    {getDate(dateKey)}
                  </Typography>
                  <Typography variant="body1">تعداد آیتم های رزرو : {transformedSchedule?.items?.length || 0}</Typography>
                  <Box mt={4}>
                    <Button onClick={onSelectDay.bind(null, +dateKey)} color="secondary" fullWidth>
                      نمایش کلی چارت
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
