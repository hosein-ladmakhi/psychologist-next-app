import OffDayScheduleScreen from "@/screens/Therapist/OffDay";
import { TOffDaySchedulePageFC } from "./page.type";
import { getOwnTherapistScheduleDayOff } from "@/services/therapist.service";
import { prepareOwnDayOffPageQueryParam } from "./prepare-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Days Off",
};

export const dynamic = "force-dynamic";

const OffDaySchedulePage: TOffDaySchedulePageFC = async ({ searchParams }) => {
  const res = await getOwnTherapistScheduleDayOff(prepareOwnDayOffPageQueryParam(searchParams));
  return <OffDayScheduleScreen content={res} />;
};

export default OffDaySchedulePage;
