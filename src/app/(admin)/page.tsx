import AdminsScreen from "@/screens/Admin/Admins";
import { getAdmins } from "@/services/admin.service";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "ادمین ها",
};

const AdminsPage: NextPage = async () => {
  const data = await getAdmins();
  return <AdminsScreen data={data.content} page={0} total={data.count} />;
};

export default AdminsPage;
