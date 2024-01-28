import { getTherapistById, getTherapistScheduleDayOff } from "@/services/therapist.service";
import { TTherapistsOffDayPageFC } from "./page.type";
import TherapistScheduleOffDayScreen from "@/screens/Admin/TherapistScheduleOffDay";
import { prepareTherapistOffDayPageQueryParam } from "./prepare-query";

export const dynamic = "force-dynamic";

const TherapistsOffDayPage: TTherapistsOffDayPageFC = async ({ searchParams, params }) => {
  const therapistId = +params.id;
  const therapist = await getTherapistById(therapistId);
  const res = await getTherapistScheduleDayOff(params.id, prepareTherapistOffDayPageQueryParam(searchParams));
  const currentPage = +(searchParams.page || "1");

  return <TherapistScheduleOffDayScreen page={currentPage} therapist={therapist} content={res.content} count={Math.ceil(res.count / 10)} />;
};

export default TherapistsOffDayPage;
