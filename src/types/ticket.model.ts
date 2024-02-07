import { IBaseEntity, IDatasourcePageRes } from "./base.model";
import { IPatient } from "./patient.model";

export enum ETicketStatus {
  Open = "Open",
  Close = "Close",
  Report = "Report",
}

export interface ITicket extends IBaseEntity {
  createdAt: Date;
  closeAt?: Date;
  title: string;
  content: string;
  attachments: string[];
  patient: IPatient;
  status: ETicketStatus;
  parent?: ITicket;
  childrens: ITicket[];
  answer?: string;
  answerAt?: Date;
}

export type TTicketPageRes = IDatasourcePageRes<ITicket>;

export interface IUpdateTicketReqBody {
  status?: ETicketStatus;
  closeAt?: Date;
}

export interface IAnswerTicketReqBody {
  answer: string;
}
