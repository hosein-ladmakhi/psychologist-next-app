import TherapistsScreen from "@/screens/Admin/Therapists";
import { getTherapists } from "@/services/therapist.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { ITherapistsPageFC } from "./page.type";
import { prepareTherapistsPageQueryParam } from "./prepare-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پزشکان",
};

const TherapistsPage: ITherapistsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const therapists = await getTherapists(prepareTherapistsPageQueryParam(searchParams));

  return (
    <TherapistsScreen count={therapists.count} data={therapists?.content} page={currentPage} totalPage={calculateTotalPageTable(therapists.count)} />
  );
};

export default TherapistsPage;
