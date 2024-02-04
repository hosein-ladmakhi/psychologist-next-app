import { getOwnOrders, getTodayOrdersByTherapistId } from "@/services/order.service";
import { TOrdersPageFC } from "./page.type";
import OrdersScreen from "@/screens/Therapist/Orders";
import { prepareOwnOrdersPageQueryParam } from "./prepare-query";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
};

const OrdersPage: TOrdersPageFC = async ({ searchParams }) => {
  const res = await getOwnOrders(prepareOwnOrdersPageQueryParam(searchParams));
  const todayOrders = await getTodayOrdersByTherapistId(1);
  return <OrdersScreen todayOrders={todayOrders} data={res} />;
};

export default OrdersPage;
