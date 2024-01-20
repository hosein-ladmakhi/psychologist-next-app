import { ITherapist } from '@/types/therapist.model';

export interface ITherapistsScreenProps {
  data: ITherapist[];
  total: number;
  page: number;
}
