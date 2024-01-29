import OrdersScreen from "@/screens/Admin/Orders";
import { TOrdersPageFC } from "./page.type";
import { getOrders } from "@/services/order.service";
import { prepareOrdersPageQueryParam } from "./prepare-query";
import { Metadata } from "next";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
};

const OrdersPage: TOrdersPageFC = async ({ searchParams }) => {
  const currentPage = +(searchParams.page || "1");
  const res = await getOrders(prepareOrdersPageQueryParam(searchParams));

  return <OrdersScreen data={res?.content} count={calculateTotalPageTable(res.count)} page={currentPage} />;
};

export default OrdersPage;
