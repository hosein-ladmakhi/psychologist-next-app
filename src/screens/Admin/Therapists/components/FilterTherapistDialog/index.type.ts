import { ITherapist } from '@/types/therapist.model';

export interface IFilterTherapistDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterTherapistFormValidation) => void;
}

export type TFilterTherapistFormValidation = Partial<
  Pick<ITherapist, 'firstName' | 'lastName' | 'phone'>
>;
