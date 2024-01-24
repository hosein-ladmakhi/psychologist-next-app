import TherapistScheduleByTherapistIdScreen from "@/screens/Admin/TherapistSchedule";
import { FC } from "react";
import { ITherapistScheduleByTherapistIdPageProps } from "./page.type";
import { getSchedulesBasedOnTherapistAndDay, getTherapistById } from "@/services/therapist.service";

const TherapistScheduleByTherapistIdPage: FC<ITherapistScheduleByTherapistIdPageProps> = async ({ params }) => {
  const schedules = await getSchedulesBasedOnTherapistAndDay(params.therapistId, params.day);
  const therapist = await getTherapistById(params.therapistId);

  return (
    <TherapistScheduleByTherapistIdScreen
      schedules={schedules?.content}
      schedulesCount={schedules?.count}
      therapist={therapist}
      selectedDay={params.day}
    />
  );
};

export default TherapistScheduleByTherapistIdPage;
