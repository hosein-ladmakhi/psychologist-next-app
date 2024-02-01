import OffDayScheduleScreen from "@/screens/Therapist/OffDay";
import { TOffDaySchedulePageFC } from "./page.type";
import { getOwnTherapistScheduleDayOff } from "@/services/therapist.service";

const OffDaySchedulePage: TOffDaySchedulePageFC = async () => {
  const res = await getOwnTherapistScheduleDayOff();
  return <OffDayScheduleScreen content={res} />;
};

export default OffDaySchedulePage;
