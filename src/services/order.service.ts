import { httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { TOrdersPageRes } from "@/screens/Admin/Orders/index.type";
import { ICreateOrder, IOrder, IOrderChangeStatusReqBody, IReservationDate } from "@/types/order.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getOrders = (filterObject: Object) =>
  httpGet<TOrdersPageRes>(`${API_URL}/orders/page${prepareQueryParams(filterObject)}`, undefined, ["orders"]);

export const changeOrderStatus = (id: number, data: IOrderChangeStatusReqBody) =>
  httpPatch<IOrderChangeStatusReqBody, IOrder>(`${API_URL}/orders/change-status/${id}`, data);

export const getTherapistOwnOrders = (filterObject: Object = {}) => httpGet<IOrder[]>(`${API_URL}/orders/own${prepareQueryParams(filterObject)}`);

export const getReservationCalendarByTherapistAndDay = (therapist: number, day: number, time: string) =>
  httpGet<IReservationDate>(`${API_URL}/orders/reservation-date/${day}/${therapist}/${time}`);

export const createOrder = (data: ICreateOrder) => httpPost<ICreateOrder, IOrder>(`${API_URL}/orders`, data);
