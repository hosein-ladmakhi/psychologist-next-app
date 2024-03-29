import { httpDelete, httpGet, httpPatch, httpPost } from "@/api";
import { API_URL } from "@/constants";
import {
  IAddNewOffDayReqBody,
  IAddNewScheduleToTherapistReqBody,
  ICreateOrEditTherapistReqBody,
  ITherapist,
  ITherapistSchedules,
  ITherapistSchedulesOff,
  ITherapistUploadRes,
  TTherapistSchedulesDayOffPageRes,
  TTherapistSchedulesPageRes,
  TTherapistSchedulesResPerDay,
  TTherapistsPageRes,
} from "@/types/therapist.model";
import { prepareQueryParams } from "@/utils/prepareQueryParams";

export const getTherapists = (filterObject: Object) =>
  httpGet<TTherapistsPageRes>(`${API_URL}/therapist${prepareQueryParams(filterObject)}`, undefined, ["therapists"]);

export const getSchedulesTherapist = (therapistId: number, filterObject: Object = {}) =>
  httpGet<TTherapistSchedulesPageRes>(`${API_URL}/therapist-schedules/therapist/${therapistId}${prepareQueryParams(filterObject)}`);

export const getSchedulesTherapistPerDay = (therapistId: number) =>
  httpGet<TTherapistSchedulesResPerDay[]>(`${API_URL}/therapist-schedules/therapist/per-day/${therapistId}`);

export const getSchedulesBasedOnTherapistAndDay = (therapistId: number, day: number) =>
  httpGet<TTherapistSchedulesPageRes>(`${API_URL}/therapist-schedules/therapist/${therapistId}/day/${day}`, undefined, ["therapists-schedules"]);

export const getTherapistById = (id: number) => httpGet<ITherapist>(`${API_URL}/therapist/${id}`);

export const uploadTherapistProfile = (data: FormData) => httpPost<FormData, ITherapistUploadRes>(`${API_URL}/therapist/profile`, data);

export const createTherapist = (data: ICreateOrEditTherapistReqBody) =>
  httpPost<ICreateOrEditTherapistReqBody, ITherapist>(`${API_URL}/therapist`, data);

export const editTherapist = (id: number, data: ICreateOrEditTherapistReqBody) =>
  httpPatch<ICreateOrEditTherapistReqBody, ITherapist>(`${API_URL}/therapist/${id}`, data);

export const deleteTherapist = (id: number) => httpDelete<ITherapist>(`${API_URL}/therapist/${id}`);

export const addNewSchedule = (data: IAddNewScheduleToTherapistReqBody) =>
  httpPost<IAddNewScheduleToTherapistReqBody, ITherapistSchedules>(`${API_URL}/therapist-schedules`, data);

export const deleteScheduleById = (id: number) => httpDelete<ITherapistSchedules>(`${API_URL}/therapist-schedules/${id}`);

export const getTherapistScheduleDayOff = (id: number, filterObject: Object = {}) =>
  httpGet<TTherapistSchedulesDayOffPageRes>(`${API_URL}/therapist-schedules-day-off/therapists/${id}${prepareQueryParams(filterObject)}`, undefined, [
    "therapist-schedule-days-off",
  ]);

export const deleteTherapistDaysOff = (id: number) => httpDelete<ITherapistSchedulesOff>(`${API_URL}/therapist-schedules-day-off/${id}`);

export const addTherapistDaysOff = (body: IAddNewOffDayReqBody) =>
  httpPost<IAddNewOffDayReqBody, ITherapistSchedulesOff>(`${API_URL}/therapist-schedules-day-off`, body);


