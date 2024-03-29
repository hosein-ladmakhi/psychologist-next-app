import { httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { IAuthResponse, ILoginReqBody, IPasswordUpdateReqBody, IPasswordUpdateResponse } from "@/types/auth.model";

export const loginUser = (type: string, body: ILoginReqBody) => httpPost<ILoginReqBody, IAuthResponse>(`${API_URL}/auth/login/${type}`, body);

export const getProfile = <T>() => httpGet<T>(`${API_URL}/auth/profile`, undefined, ["profile"]);

export const updatePasswordById = (id: number, { type, ...reqBody }: IPasswordUpdateReqBody) =>
  httpPatch<IPasswordUpdateReqBody, IPasswordUpdateResponse>(`${API_URL}/auth/change-password/${type}/${id}`, reqBody);
