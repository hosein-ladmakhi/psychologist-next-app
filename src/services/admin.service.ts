import { httpDelete, httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { IAdmin, ICreateOrEditAdminReqBody, TAdminPageRes } from "@/types/admin.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getAdmins = (filterObject: Object = {}) => httpGet(`${API_URL}/admin${prepareQueryParams(filterObject)}`, undefined, ["admins"]) as Promise<TAdminPageRes>;

export const deleteAdminById = (id: number) => httpDelete(`${API_URL}/admin/${id}`) as Promise<IAdmin>;

export const createAdmin = (data: ICreateOrEditAdminReqBody) => httpPost(`${API_URL}/admin`, data) as Promise<IAdmin>;

export const editAdminById = (id: number, data: Partial<ICreateOrEditAdminReqBody>) => httpPatch(`${API_URL}/admin/${id}`, data) as Promise<IAdmin>;

