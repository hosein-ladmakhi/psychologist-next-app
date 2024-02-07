"use server";

import { answerTicket, deleteTicket, updateTicket } from "@/services/ticket.service";
import { ETicketStatus, IAnswerTicketReqBody } from "@/types/ticket.model";
import { revalidateTag } from "next/cache";

export const closeTicketAction = async (id: number) => {
  const res = await updateTicket(id, { status: ETicketStatus.Close, closeAt: new Date() });
  if (res) {
    revalidateTag("tickets");
    return true;
  }
  return false;
};

export const deleteTicketAction = async (id: number) => {
  const res = await deleteTicket(id);
  if (res) {
    revalidateTag("tickets");
    return true;
  }
  return false;
};

export const answerTicketAction = async (id: number, data: IAnswerTicketReqBody) => {
  const res = await answerTicket(id, data);
  if (res) {
    revalidateTag("tickets");
    return true;
  }
  return false;
};
