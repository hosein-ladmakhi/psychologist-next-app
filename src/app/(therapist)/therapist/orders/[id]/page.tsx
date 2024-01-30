import OrderDetailScreen from "@/screens/Therapist/OrderDetail";
import { TOrderDetailPageFC } from "./page.type";
import { getOrderById, getOrderByPatientId } from "@/services/order.service";

export const dynamic = "force-dynamic";

const OrderDetailPage: TOrderDetailPageFC = async ({ params }) => {
  const orderId = +params.id;
  const res = await getOrderById(orderId);
  const latestPatientOrders = (await getOrderByPatientId(res?.patient?.id))?.filter((e) => e.id !== orderId);

  return <OrderDetailScreen latestPatientOrders={latestPatientOrders} order={res} />;
};

export default OrderDetailPage;
