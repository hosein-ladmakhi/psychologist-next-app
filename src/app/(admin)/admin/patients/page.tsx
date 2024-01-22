import PatientsScreen from "@/screens/Admin/Patients";
import { getPatientsPageApi } from "@/services/patient.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { TPatientsPageFC } from "./page.type";
import { preparePatientsPageQueryParam } from "./prepare-query";

export const dynamic = "force-dynamic";

const PatientsPage: TPatientsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const data = await getPatientsPageApi(preparePatientsPageQueryParam(searchParams));

  return <PatientsScreen page={currentPage} data={data?.content} total={calculateTotalPageTable(data?.count)} />;
};

export default PatientsPage;
