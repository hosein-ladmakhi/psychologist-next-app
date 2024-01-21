import { ITherapist, ITherapistSchedules } from '@/types/therapist.model';

export interface ITherapistScheduleByTherapistIdScreenProps {
  schedules: ITherapistSchedules[];
  schedulesCount: number;
  therapist: ITherapist;
  selectedDay: number;
}
