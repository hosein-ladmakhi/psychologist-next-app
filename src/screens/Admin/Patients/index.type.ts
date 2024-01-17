import { IPatient } from '@/types/patient.model';

export interface IPatientsProps {
  data: IPatient[];
  total: number;
  page: number;
}
