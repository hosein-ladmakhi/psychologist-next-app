"use server";

import { createTicket, deleteOwnTicket } from "@/services/ticket.service";
import { revalidateTag } from "next/cache";

export const createTicketAction = async (data: FormData) => {
  const res = await createTicket(data);
  console.log(res);
  if (res) {
    revalidateTag("own-tickets");
    return true;
  }
  return false;
};

export const deleteTicketAction = async (id: number) => {
  const res = await deleteOwnTicket(id);
  if (res) {
    revalidateTag("own-tickets");
    return true;
  }
  return false;
};
