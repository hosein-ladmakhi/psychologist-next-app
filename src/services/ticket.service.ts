import { httpDelete, httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { IAnswerTicketReqBody, ITicket, IUpdateTicketReqBody, TTicketPageRes } from "@/types/ticket.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const createTicket = (data: FormData) => httpPost<FormData, ITicket>(`${API_URL}/tickets`, data);

export const deleteTicket = (id: number) => httpDelete<ITicket>(`${API_URL}/tickets/${id}`);

export const getTicketsPage = (filterObject: any = {}) =>
  httpGet<TTicketPageRes>(`${API_URL}/tickets/page${prepareQueryParams(filterObject)}`, undefined, ["tickets"]);

export const updateTicket = (id: number, data: IUpdateTicketReqBody) => httpPatch<IUpdateTicketReqBody, ITicket>(`${API_URL}/tickets/${id}`, data);

export const answerTicket = (id: number, data: IAnswerTicketReqBody) =>
  httpPost<IAnswerTicketReqBody, ITicket>(`${API_URL}/tickets/answer/${id}`, data);

export const getAttachmentsAsZipFile = (id: number) => httpGet<Buffer>(`${API_URL}/tickets/download/attachment/${id}`);
