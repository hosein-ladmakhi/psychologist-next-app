import { ITicket } from "@/types/ticket.model";
import { FC } from "react";

interface ITicketsScreenProps {
  totalPage: number;
  count: number;
  data: ITicket[];
}

export type TTicketsScreenFC = FC<ITicketsScreenProps>;
