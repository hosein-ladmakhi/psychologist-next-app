import { getOwnOrders, getTodayOrdersByTherapistId } from "@/services/order.service";
import { TOrdersPageFC } from "./page.type";
import OrdersScreen from "@/screens/Therapist/Orders";

export const dynamic = "force-dynamic";

const OrdersPage: TOrdersPageFC = async () => {
  const res = await getOwnOrders();
  const todayOrders = await getTodayOrdersByTherapistId(1);
  return <OrdersScreen todayOrders={todayOrders} data={res} />;
};

export default OrdersPage;
