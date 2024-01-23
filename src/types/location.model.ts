import { IDatasourcePageRes } from "./base.model";
import { ITherapistSchedules } from "./therapist.model";

export interface ILocation {
  id: number;
  city: string;
  address: string;
  therapistSchedules?: ITherapistSchedules[];
}

export type TLocationPageRes = IDatasourcePageRes<ILocation>;

export type ICreateOrEditLocationReqBody = Omit<ILocation, "id" | "therapistSchedules">;

export interface ICity {
  id: number;
  title: string;
  slug: string;
  province_id: number;
  latitude: number;
  longitude: number;
}
