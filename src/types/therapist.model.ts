import { IBaseEntity, IBaseUser, IDatasourcePageRes } from './base.model';
import { ICategory } from './category.model';
import { ILocation } from './location.model';

export enum EDegtreeOfEducation {
  diploma = 'diploma',
  associate = 'associate',
  bachelor = 'bachelor',
  master = 'master',
  doctorate = 'doctorate',
}

export enum ETherapistScheduleType {
  online = 'online',
  onsite = 'onsite',
  both = 'both',
}

export enum EGender {
  male = 'male',
  female = 'female',
}

export type TTherapistsPageRes = IDatasourcePageRes<ITherapist>;

export interface ITherapist extends IBaseEntity, IBaseUser {
  phone2: string;
  bio: string;
  address: string;
  degreeOfEducation: EDegtreeOfEducation;
  gender: EGender;
  image: string;
  workingFields: ICategory[];
  schedules: ITherapistSchedules[];
}

export interface ITherapistSchedules extends IBaseEntity {
  therapist: ITherapist;
  day: number;
  startHour: string;
  endHour: string;
  location: ILocation;
  type: ETherapistScheduleType;
  room: number;
}

export interface ITherapistSchedulesOff extends IBaseEntity {
  id: number;
  date: string;
  schedule: ITherapistSchedules;
}

export interface ITherapistSchedulesOffBasedOnTherapist {
  user: ITherapist;
  items: ITherapistSchedulesOff[];
}