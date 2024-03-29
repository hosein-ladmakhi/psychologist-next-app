import TicketsScreen from "@/screens/Admin/Tickets";
import { TTicketsPageFC } from "./page.type";
import { getTicketsPage } from "@/services/ticket.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "لیست تیکت ها",
};

const TicketsPage: TTicketsPageFC = async () => {
  const res = await getTicketsPage();

  return <TicketsScreen data={res?.content} count={res?.count} totalPage={calculateTotalPageTable(res?.count)} />;
};

export default TicketsPage;
