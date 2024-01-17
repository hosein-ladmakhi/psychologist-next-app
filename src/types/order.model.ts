import { IPatient } from './patient.model';

enum OrderStatus {
  Done = 'Done',
  Cancel = 'Cancel',
  Pending = 'Pending',
}

export interface IOrder {
  documentation: any[];
  //   documentation: UserDocumentation[];

  patient: IPatient;

  therapist: any;
  //   therapist: Therapist;

  day: number;

  city: string;

  address: string;

  date: Date;

  room: number;

  categories: { enName: string; faName: string }[];

  type: any;
  //   type: TherapistScheduleType;

  startHour: string;

  endHour: string;

  status: OrderStatus;
}
