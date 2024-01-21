import { httpDelete, httpGet, httpPatch, httpPost } from '@/api';
import { API_URL } from '@/constants';
import {
  ICreateOrEditTherapistReqBody,
  ITherapist,
  ITherapistUploadRes,
  TTherapistSchedulesPageRes,
  TTherapistSchedulesResPerDay,
  TTherapistsPageRes,
} from '@/types/therapist.model';
import { prepareQueryParams } from '@/utils/prepareQueryParams';

export const getTherapists = (filterObject: Object) =>
  httpGet<TTherapistsPageRes>(
    `${API_URL}/therapist${prepareQueryParams(filterObject)}`,
    undefined,
    ['therapists'],
  );

export const getSchedulesTherapist = (therapistId: number) =>
  httpGet<TTherapistSchedulesPageRes>(
    `${API_URL}/therapist-schedules/therapist/${therapistId}`,
  );

export const getSchedulesTherapistPerDay = (therapistId: number) =>
  httpGet<TTherapistSchedulesResPerDay[]>(
    `${API_URL}/therapist-schedules/therapist/per-day/${therapistId}`,
  );

export const getSchedulesBasedOnTherapistAndDay = (
  therapistId: number,
  day: number,
) =>
  httpGet<TTherapistSchedulesPageRes>(
    `${API_URL}/therapist-schedules/therapist/${therapistId}/day/${day}`,
  );

export const getTherapistById = (id: number) =>
  httpGet<ITherapist>(`${API_URL}/therapist/${id}`);

export const uploadTherapistProfile = (data: FormData) =>
  httpPost<FormData, ITherapistUploadRes>(`${API_URL}/therapist/profile`, data);

export const createTherapist = (data: ICreateOrEditTherapistReqBody) =>
  httpPost<ICreateOrEditTherapistReqBody, ITherapist>(
    `${API_URL}/therapist`,
    data,
  );

export const editTherapist = (
  id: number,
  data: ICreateOrEditTherapistReqBody,
) =>
  httpPatch<ICreateOrEditTherapistReqBody, ITherapist>(
    `${API_URL}/therapist/${id}`,
    data,
  );

export const deleteTherapist = (id: number) =>
  httpDelete<ITherapist>(`${API_URL}/therapist/${id}`);
