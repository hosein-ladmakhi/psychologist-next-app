import { ITicket } from "@/types/ticket.model";
import { FC } from "react";
import { answerTicketFormValidation } from "./index.constant";
import zod from "zod";

interface IViewTicketDialogProps {
  handleClose: () => void;
  selectedTicket: ITicket;
}

export type TViewTicketDialogFC = FC<IViewTicketDialogProps>;

export type TAnswerTicketyFormValidation = zod.infer<typeof answerTicketFormValidation>;
