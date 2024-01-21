import { INextPage } from '@/types/base.model';

export interface ITherapistScheduleByTherapistIdPageProps
  extends INextPage<ITherapistScheduleByTherapistIdPageParams> {}

export interface ITherapistScheduleByTherapistIdPageParams {
  therapistId: number;
  day: number;
}
