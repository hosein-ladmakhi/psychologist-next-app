import { getTherapistById, getTherapistScheduleDayOff } from "@/services/therapist.service";
import { TTherapistsOffDayPageFC } from "./page.type";
import TherapistScheduleOffDayScreen from "@/screens/Admin/TherapistScheduleOffDay";

export const dynamic = "force-dynamic";

const TherapistsOffDayPage: TTherapistsOffDayPageFC = async ({ searchParams, params }) => {
  const therapistId = +params.id;
  const therapist = await getTherapistById(therapistId);
  const res = await getTherapistScheduleDayOff(params.id);
  return <TherapistScheduleOffDayScreen therapist={therapist} content={res.content} count={res.count} />;
};

export default TherapistsOffDayPage;
