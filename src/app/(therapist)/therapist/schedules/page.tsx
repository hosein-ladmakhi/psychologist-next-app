import SchedulesScreen from "@/screens/Therapist/Schedules";
import { TSchedulesPageFC } from "./page.type";
import { getOwnSchedulesTherapist } from "@/services/therapist.service";

export const dynamic = "force-dynamic";

const SchedulesPage: TSchedulesPageFC = async () => {
  const res = await getOwnSchedulesTherapist();
  return <SchedulesScreen content={res} />;
};

export default SchedulesPage;
