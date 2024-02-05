import { httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { TOrdersPageRes } from "@/screens/Admin/Orders/index.type";
import { ICreateOrder, IOrder, IOrderChangeStatusReqBody, IOrderDetailBasedOnTherapist, IReservationDate } from "@/types/order.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getOrders = (filterObject: Object) =>
  httpGet<TOrdersPageRes>(`${API_URL}/orders/page${prepareQueryParams(filterObject)}`, undefined, ["orders"]);

export const changeOrderStatus = (id: number, data: IOrderChangeStatusReqBody) =>
  httpPatch<IOrderChangeStatusReqBody, IOrder>(`${API_URL}/orders/change-status/${id}`, data);

export const getTherapistOwnOrders = (filterObject: Object = {}) => httpGet<IOrder[]>(`${API_URL}/orders/own${prepareQueryParams(filterObject)}`);

export const getOwnPatientOrders = (filterObject: Object = {}) =>
  httpGet<IOrder[]>(`${API_URL}/orders/patient/own${prepareQueryParams(filterObject)}`);

export const getOrderPatientByTherapistId = (id: number) => httpGet<IOrderDetailBasedOnTherapist>(`${API_URL}/orders/detail/${id}`);

export const getTodayOrdersByTherapistId = (id: number) => httpGet<IOrder[]>(`${API_URL}/orders/today/${id}`);

export const getOrderById = (id: number) => httpGet<IOrder>(`${API_URL}/orders/${id}`);

export const getOrderByPatientId = (id: number) => httpGet<IOrder[]>(`${API_URL}/orders/patient/${id}`);

export const getReservationCalendarByTherapistAndDay = (therapist: number, day: number, time: string) =>
  httpGet<IReservationDate>(`${API_URL}/orders/reservation-date/${day}/${therapist}/${time}`);

export const createOrder = (data: ICreateOrder) => httpPost<ICreateOrder, IOrder>(`${API_URL}/orders`, data);
