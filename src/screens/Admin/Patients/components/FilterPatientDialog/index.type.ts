import { IPatient } from '@/types/patient.model';

export interface IFilterPatientDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterPatientFormValidation) => void;
}

export type TFilterPatientFormValidation = Partial<
  Pick<IPatient, 'firstName' | 'lastName' | 'phone'>
>;
