export interface ISignupReqBody {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

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
