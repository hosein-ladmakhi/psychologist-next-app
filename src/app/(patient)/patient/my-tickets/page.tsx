import { Metadata } from "next";
import { TMyTicketPageFC } from "./page.type";
import MyTicketsScreen from "@/screens/Patient/MyTickets";

export const metadata: Metadata = {
  title: "My Tickets",
};

export const dynamic = "force-dynamic";

const MyTicketsPage: TMyTicketPageFC = () => {
  return <MyTicketsScreen />;
};

export default MyTicketsPage;
