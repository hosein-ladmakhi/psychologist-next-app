import TherapistsScreen from "@/screens/Admin/Therapists";
import { getTherapists } from "@/services/therapist.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { ITherapistsPageFC } from "./page.type";
import { prepareTherapistsPageQueryParam } from "./prepare-query";

export const dynamic = "force-dynamic";

const TherapistsPage: ITherapistsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const therapists = await getTherapists(prepareTherapistsPageQueryParam(searchParams));

  return <TherapistsScreen data={therapists?.content} page={currentPage} total={calculateTotalPageTable(therapists.count)} />;
};

export default TherapistsPage;
