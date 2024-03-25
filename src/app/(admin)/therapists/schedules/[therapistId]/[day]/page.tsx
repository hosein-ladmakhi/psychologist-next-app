import TherapistScheduleByTherapistIdScreen from "@/screens/Admin/TherapistSchedule";
import { TNextPage, TTherapistScheduleByTherapistIdPageFC } from "./page.type";
import { getSchedulesBasedOnTherapistAndDay, getTherapistById } from "@/services/therapist.service";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: TNextPage): Promise<Metadata> => {
  const therapistId = +params.therapistId;
  const therapist = await getTherapistById(therapistId);
  return { title: `${therapist.firstName} ${therapist.lastName}` };
};

const TherapistScheduleByTherapistIdPage: TTherapistScheduleByTherapistIdPageFC = async ({ params }) => {
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
