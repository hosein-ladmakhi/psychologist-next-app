import { httpGet, httpPatch } from "@/api";
import { API_URL } from "@/constants";
import { TOrdersPageRes } from "@/screens/Admin/Orders/index.type";
import { IOrder, IOrderChangeStatusReqBody } from "@/types/order.model";

export const getOrders = () => httpGet<TOrdersPageRes>(`${API_URL}/orders/page`, undefined, ["orders"]);

export const changeOrderStatus = (id: number, data: IOrderChangeStatusReqBody) =>
  httpPatch<IOrderChangeStatusReqBody, IOrder>(`${API_URL}/orders/change-status/${id}`, data);
