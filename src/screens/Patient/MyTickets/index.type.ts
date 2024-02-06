import { ITicket } from "@/types/ticket.model";
import { FC } from "react";

interface IMyTicketsScreenProps {
  data: ITicket[];
  count: number;
  totalPage: number;
}

export type TMyTicketsScreenFC = FC<IMyTicketsScreenProps>;
