import { httpGet } from '@/api';
import { API_URL } from '@/constants';
import {
  ITherapist,
  TTherapistSchedulesPageRes,
  TTherapistSchedulesResPerDay,
  TTherapistsPageRes,
} from '@/types/therapist.model';
import { prepareQueryParams } from '@/utils/prepareQueryParams';

export const getTherapists = (filterObject: Object) =>
  httpGet<TTherapistsPageRes>(
    `${API_URL}/therapist${prepareQueryParams(filterObject)}`,
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
