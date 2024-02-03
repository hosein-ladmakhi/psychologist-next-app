import { getOwnOrders, getTodayOrdersByTherapistId } from "@/services/order.service";
import { TOrdersPageFC } from "./page.type";
import OrdersScreen from "@/screens/Therapist/Orders";
import { prepareOwnOrdersPageQueryParam } from "./prepare-query";

export const dynamic = "force-dynamic";

const OrdersPage: TOrdersPageFC = async ({ searchParams }) => {
  const res = await getOwnOrders(prepareOwnOrdersPageQueryParam(searchParams));
  const todayOrders = await getTodayOrdersByTherapistId(1);
  return <OrdersScreen todayOrders={todayOrders} data={res} />;
};

export default OrdersPage;
