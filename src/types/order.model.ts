import { IBaseEntity, IDatasourcePageRes } from "./base.model";
import { IDocumentation } from "./documentation.model";
import { IPatient } from "./patient.model";
import { ETherapistScheduleType, ITherapist } from "./therapist.model";

export enum EOrderStatus {
  Done = "Done",
  Cancel = "Cancel",
  Pending = "Pending",
}

export interface IOrder extends IBaseEntity {
  documentation: IDocumentation[];
  patient: IPatient;
  therapist: ITherapist;
  day: number;
  city: string;
  address: string;
  date: Date;
  room: number;
  categories: { enName: string; faName: string }[];
  type: ETherapistScheduleType;
  startHour: string;
  endHour: string;
  status: EOrderStatus;
}

export type TOrderPageRes = IDatasourcePageRes<IOrder>;

export interface IOrderChangeStatusReqBody {
  status: EOrderStatus;
}
