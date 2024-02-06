import { Metadata } from "next";
import { TMyTicketPageFC } from "./page.type";
import MyTicketsScreen from "@/screens/Patient/MyTickets";
import { getOwnTickets } from "@/services/ticket.service";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";

export const metadata: Metadata = {
  title: "My Tickets",
};

export const dynamic = "force-dynamic";

const MyTicketsPage: TMyTicketPageFC = async () => {
  const res = await getOwnTickets();
  return <MyTicketsScreen count={res.count} data={res.content} totalPage={calculateTotalPageTable(res.count)} />;
};

export default MyTicketsPage;
