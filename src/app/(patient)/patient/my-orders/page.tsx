import MyOrdersScreen from "@/screens/Patient/MyOrders";
import { TMyOrdersPageFC } from "./page.type";
import { Metadata } from "next";
import { getOwnPatientOrders } from "@/services/order.service";
import { prepareMyOrdersPageQueryParam } from "./prepare-query";

export const metadata: Metadata = {
  title: "My Reservations",
};

export const dynamic = "force-dynamic";

const MyOrdersPage: TMyOrdersPageFC = async ({ searchParams }) => {
  const orders = await getOwnPatientOrders(prepareMyOrdersPageQueryParam(searchParams));

  return <MyOrdersScreen orders={orders} />;
};

export default MyOrdersPage;
