import PatientsScreen from "@/screens/Admin/Patients";
import { getPatientsPageApi } from "@/services/patient.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { TPatientsPageFC } from "./page.type";
import { preparePatientsPageQueryParam } from "./prepare-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "بیماران",
};

const PatientsPage: TPatientsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const data = await getPatientsPageApi(preparePatientsPageQueryParam(searchParams));

  return <PatientsScreen count={data?.count} page={currentPage} data={data?.content} totalPage={calculateTotalPageTable(data?.count)} />;
};

export default PatientsPage;
