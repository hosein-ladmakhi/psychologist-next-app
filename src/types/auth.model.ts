import { Session } from "next-auth";
import { IAdmin } from "./admin.model";

export interface ILoginReqBody {
  phone: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}

export interface IPasswordUpdateReqBody {
  password: string;
  currentPassword: string;
  type?: string
}

export interface IPasswordUpdateResponse {
  success: boolean;
  message?: string;
}


export interface INextAuthSessionData {
  user: IAdmin
  expires: string;
  accessToken: string
}

export type TNextAuthSessionStatus = 'authenticated' | 'unauthenticated' | 'loading'

export interface INextAuthSession {
  update: (data?: any) => Promise<Session | null>
  data: INextAuthSessionData
  status: TNextAuthSessionStatus
}