import { httpPost } from "@/api";
import { API_URL } from "@/constants";
import { IAuthResponse, ILoginReqBody, ISignupReqBody } from "@/types/auth.model";

export const signupUser = (type: string, body: ISignupReqBody) => httpPost<ISignupReqBody, IAuthResponse>(`${API_URL}/auth/signup/${type}`, body);

export const loginUser = (type: string, body: ILoginReqBody) => httpPost<ILoginReqBody, IAuthResponse>(`${API_URL}/auth/login/${type}`, body);
