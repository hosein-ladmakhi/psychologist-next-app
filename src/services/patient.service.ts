import { httpDelete, httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { TCreateOrEditPatientBody, IPatient, TPatientPageRes } from "@/types/patient.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getPatientsPageApi = (data: Object) => {
  return httpGet<TPatientPageRes>(`${API_URL}/patient${prepareQueryParams(data)}`, undefined, ["patients"]);
};
export const deletePatientById = (id: number) => httpDelete<IPatient>(`${API_URL}/patient/${id}`);

export const createPatient = (data: TCreateOrEditPatientBody) => httpPost<TCreateOrEditPatientBody, IPatient>(`${API_URL}/patient`, data);

export const editPatient = (id: number, data: TCreateOrEditPatientBody) =>
  httpPatch<TCreateOrEditPatientBody, IPatient>(`${API_URL}/patient/${id}`, data);