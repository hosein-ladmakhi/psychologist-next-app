import TicketsScreen from "@/screens/Admin/Tickets";
import { TTicketsPageFC } from "./page.type";
import { getTicketsPage } from "@/services/ticket.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";

export const dynamic = "force-dyanmic";

const TicketsPage: TTicketsPageFC = async () => {
  const res = await getTicketsPage();

  return <TicketsScreen data={res?.content} count={res?.count} totalPage={calculateTotalPageTable(res?.count)} />;
};

export default TicketsPage;
