import { ITicket } from "@/types/ticket.model";
import { FC } from "react";

interface IViewTicketDialogProps {
  handleClose: () => void;
  selectedTicket: ITicket;
  handleCreate: () => void;
  handleDelete: (ticket: ITicket) => void;
}

export type TViewTicketDialogFC = FC<IViewTicketDialogProps>;
