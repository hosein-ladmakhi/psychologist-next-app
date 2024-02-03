import SchedulesScreen from "@/screens/Therapist/Schedules";
import { TSchedulesPageFC } from "./page.type";
import { getOwnSchedulesTherapist } from "@/services/therapist.service";
import { prepareOwnSchedulesPageQueryParam } from "./prepare-query";

export const dynamic = "force-dynamic";

const SchedulesPage: TSchedulesPageFC = async ({ searchParams }) => {
  const res = await getOwnSchedulesTherapist(prepareOwnSchedulesPageQueryParam(searchParams));
  return <SchedulesScreen content={res} />;
};

export default SchedulesPage;
