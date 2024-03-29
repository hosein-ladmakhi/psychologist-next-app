import { IBaseEntity, IBaseUser, IDatasourcePageRes } from "./base.model";

export interface IAdmin extends IBaseEntity, IBaseUser {
    isActive: boolean;
    password: string;
}


export type TAdminPageRes = IDatasourcePageRes<IAdmin>;

export interface ICreateOrEditAdminReqBody {
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
    id?: number;
    isActive: boolean
}