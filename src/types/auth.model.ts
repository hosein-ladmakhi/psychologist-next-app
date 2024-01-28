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
