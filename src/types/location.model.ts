import { ITherapistSchedules } from './therapist.model';

export interface ILocation {
  id: number;
  city: string;
  address: string;
  therapistSchedules?: ITherapistSchedules[];
}
