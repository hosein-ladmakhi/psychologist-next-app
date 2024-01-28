import { getTherapistById, getTherapistScheduleDayOff } from "@/services/therapist.service";
import { TNextPage, TTherapistsOffDayPageFC } from "./page.type";
import TherapistScheduleOffDayScreen from "@/screens/Admin/TherapistScheduleOffDay";
import { prepareTherapistOffDayPageQueryParam } from "./prepare-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: TNextPage): Promise<Metadata> => {
  const therapistId = +params.id;
  const therapist = await getTherapistById(therapistId);
  return { title: `${therapist.firstName} ${therapist.lastName}` };
};

const TherapistsOffDayPage: TTherapistsOffDayPageFC = async ({ searchParams, params }) => {
  const therapistId = +params.id;
  const therapist = await getTherapistById(therapistId);
  const res = await getTherapistScheduleDayOff(params.id, prepareTherapistOffDayPageQueryParam(searchParams));
  const currentPage = +(searchParams.page || "1");

  return <TherapistScheduleOffDayScreen page={currentPage} therapist={therapist} content={res.content} count={Math.ceil(res.count / 10)} />;
};

export default TherapistsOffDayPage;
