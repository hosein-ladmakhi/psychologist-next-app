import { httpDelete, httpGet, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { ITicket, TTicketPageRes } from "@/types/ticket.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const createTicket = (data: FormData) => httpPost<FormData, ITicket>(`${API_URL}/tickets`, data);

export const getOwnTickets = (filterObject: Object = {}) =>
  httpGet<TTicketPageRes>(`${API_URL}/tickets/own${prepareQueryParams(filterObject)}`, undefined, ["own-tickets"]);

export const deleteTicket = (id: number) => httpDelete<ITicket>(`${API_URL}/tickets/${id}`);
