import { httpDelete, httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import { ICreateOrEditLocationReqBody, ILocation, TLocationPageRes } from "@/types/location.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const
  getLocations = (filterObject: Object) =>
    httpGet<TLocationPageRes>(`${API_URL}/locations${prepareQueryParams(filterObject)}`, undefined, ["locations"]);

export const deleteLocation = (id: number) => httpDelete<ILocation>(`${API_URL}/locations/${id}`);

export const editLocation = (id: number, data: ICreateOrEditLocationReqBody) =>
  httpPatch<ICreateOrEditLocationReqBody, ILocation>(`${API_URL}/locations/${id}`, data);

export const createLocation = (data: ICreateOrEditLocationReqBody) => httpPost<ICreateOrEditLocationReqBody, ILocation>(`${API_URL}/locations`, data);
