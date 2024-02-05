import MyOrdersScreen from "@/screens/Patient/MyOrders";
import { TMyOrdersPageFC } from "./page.type";
import { Metadata } from "next";
import { getOwnPatientOrders } from "@/services/order.service";

export const metadata: Metadata = {
  title: "My Reservations",
};

export const dynamic = "force-dynamic";

const MyOrdersPage: TMyOrdersPageFC = async () => {
  const orders = await getOwnPatientOrders();

  return <MyOrdersScreen orders={orders} />;
};

export default MyOrdersPage;
