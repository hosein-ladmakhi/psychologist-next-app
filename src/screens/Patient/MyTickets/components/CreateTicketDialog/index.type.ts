import { FC } from "react";
import zod from "zod";
import { createTicketFormValidation } from "./index.constant";
import { ITicket } from "@/types/ticket.model";

interface ICreateTicketDialogProps {
  handleClose: () => void;
  selectedTicket?: ITicket;
}

export type TCreateTicketDialogFC = FC<ICreateTicketDialogProps>;

export type TCreateTicketFormValidation = zod.infer<typeof createTicketFormValidation>;
