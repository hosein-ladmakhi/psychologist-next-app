import { IBaseEntity } from "./base.model";
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


export interface IOrderChangeStatusReqBody {
  status: EOrderStatus;
}


export interface IReservationDate {
  dates: string[];
}

export interface ICreateOrder {
  patient: number;
  therapist: number;
  day: number;
  location: number;
  date: string;
  room: number;
  categories: number[];
  type: ETherapistScheduleType;
  startHour: string;
  endHour: string;
}
