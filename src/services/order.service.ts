import { httpGet, httpPatch } from "@/api";
import { API_URL } from "@/constants";
import { TOrdersPageRes } from "@/screens/Admin/Orders/index.type";
import { IOrder, IOrderChangeStatusReqBody, IOrderDetailBasedOnTherapist } from "@/types/order.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getOrders = (filterObject: Object) =>
  httpGet<TOrdersPageRes>(`${API_URL}/orders/page${prepareQueryParams(filterObject)}`, undefined, ["orders"]);

export const changeOrderStatus = (id: number, data: IOrderChangeStatusReqBody) =>
  httpPatch<IOrderChangeStatusReqBody, IOrder>(`${API_URL}/orders/change-status/${id}`, data);

export const getOwnOrders = (filterObject: Object = {}) => httpGet<IOrder[]>(`${API_URL}/orders/own${prepareQueryParams(filterObject)}`);

export const getOrderPatientByTherapistId = (id: number) => httpGet<IOrderDetailBasedOnTherapist>(`${API_URL}/orders/detail/${id}`);

export const getTodayOrdersByTherapistId = (id: number) => httpGet<IOrder[]>(`${API_URL}/orders/today/${id}`);

export const getOrderById = (id: number) => httpGet<IOrder>(`${API_URL}/orders/${id}`);

export const getOrderByPatientId = (id: number) => httpGet<IOrder[]>(`${API_URL}/orders/patient/${id}`);
