import { IBaseEntity, IBaseUser, IDatasourcePageRes } from "./base.model";
import { IOrder } from "./order.model";

export interface IPatient extends IBaseEntity, IBaseUser {
  orders: IOrder[];
}

export type TPatientPageRes = IDatasourcePageRes<IPatient>;

export type TCreateOrEditPatientBody = Pick<IPatient, "firstName" | "lastName" | "phone">;
