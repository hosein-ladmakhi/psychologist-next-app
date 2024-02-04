import { Metadata } from "next";
import { TDashboardPageFC } from "./page.type";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

const DashboardPage: TDashboardPageFC = () => {
  return <p>dashboard</p>;
};

export default DashboardPage;
