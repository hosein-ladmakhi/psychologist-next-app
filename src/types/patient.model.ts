import { IBaseEntity, IBaseUser, IDatasourcePageRes } from './base.model';
import { IOrder } from './order.model';

export interface IPatient extends IBaseEntity, IBaseUser {
  orders: IOrder[];
}

export type IPatientPageRes = IDatasourcePageRes<IPatient>;
