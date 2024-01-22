import { IDatasourcePageRes } from "./base.model";
import { ITherapistSchedules } from "./therapist.model";

export interface ILocation {
  id: number;
  city: string;
  address: string;
  therapistSchedules?: ITherapistSchedules[];
}

export type TLocationPageRes = IDatasourcePageRes<ILocation>;
