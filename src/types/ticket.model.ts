import { IBaseEntity, IDatasourcePageRes } from "./base.model";
import { IPatient } from "./patient.model";

export enum ETicketStatus {
  Open = "Open",
  Close = "Close",
  Report = "Report",
}

export interface ITicket extends IBaseEntity {
  createdAt: Date;
  closedAt?: Date;
  title: string;
  content: string;
  attachments: string[];
  patient: IPatient;
  status: ETicketStatus;
  parent?: ITicket;
  childrens: ITicket[];
}

export type TTicketPageRes = IDatasourcePageRes<ITicket>;
