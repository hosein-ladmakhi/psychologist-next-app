import AdminsScreen from "@/screens/Admin/Admins";
import { getAdmins } from "@/services/admin.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { Metadata } from "next";
import { TAdminsPageFC } from "./page.type";
import { prepareAdminsPageQueryParam } from "./prepare-query";

export const metadata: Metadata = {
  title: "ادمین ها"
};

const AdminsPage: TAdminsPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const data = await getAdmins(prepareAdminsPageQueryParam(searchParams));

  return <AdminsScreen data={data.content} page={currentPage} count={data.count}
                       totalPage={calculateTotalPageTable(data.count)} />;
};

export default AdminsPage;
