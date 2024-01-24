import { httpGet, httpPatch } from "@/api";
import { API_URL } from "@/constants";
import { TOrdersPageRes } from "@/screens/Admin/Orders/index.type";
import { IOrder, IOrderChangeStatusReqBody } from "@/types/order.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getOrders = (filterObject: Object) =>
  httpGet<TOrdersPageRes>(`${API_URL}/orders/page${prepareQueryParams(filterObject)}`, undefined, ["orders"]);

export const changeOrderStatus = (id: number, data: IOrderChangeStatusReqBody) =>
  httpPatch<IOrderChangeStatusReqBody, IOrder>(`${API_URL}/orders/change-status/${id}`, data);
