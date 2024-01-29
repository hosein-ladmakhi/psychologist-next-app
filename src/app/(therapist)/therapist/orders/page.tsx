import { getOwnOrders } from "@/services/order.service";
import { TOrdersPageFC } from "./page.type";
import OrdersScreen from "@/screens/Therapist/Orders";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";

export const dynamic = "force-dynamic";

const OrdersPage: TOrdersPageFC = async () => {
  const res = await getOwnOrders();
  return <OrdersScreen count={res.count} data={res.content} totalPageCount={calculateTotalPageTable(res.count)} />;
};

export default OrdersPage;
