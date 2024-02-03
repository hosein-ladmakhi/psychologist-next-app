import OffDayScheduleScreen from "@/screens/Therapist/OffDay";
import { TOffDaySchedulePageFC } from "./page.type";
import { getOwnTherapistScheduleDayOff } from "@/services/therapist.service";
import { prepareOwnDayOffPageQueryParam } from "./prepare-query";

const OffDaySchedulePage: TOffDaySchedulePageFC = async ({ searchParams }) => {
  const res = await getOwnTherapistScheduleDayOff(prepareOwnDayOffPageQueryParam(searchParams));
  return <OffDayScheduleScreen content={res} />;
};

export default OffDaySchedulePage;
