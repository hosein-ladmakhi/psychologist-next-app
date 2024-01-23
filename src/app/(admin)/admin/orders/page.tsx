import OrdersScreen from "@/screens/Admin/Orders";
import { TOrdersPageFC } from "./page.type";
import { getOrders } from "@/services/order.service";

const OrdersPage: TOrdersPageFC = async ({ searchParams }) => {
  const res = await getOrders();
  return <OrdersScreen data={res?.content} count={res?.count} />;
};

export default OrdersPage;
