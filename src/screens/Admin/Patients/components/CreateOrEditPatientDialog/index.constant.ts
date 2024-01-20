import * as zod from 'zod';
export const UPSERT_PATIENT_SUBJECT = 'UPSERT_PATIENT_SUBJECT';

export const createOrEditPatientFormValidation = zod.object({
  firstName: zod
    .string({ required_error: 'You Must Provide Your First Name' })
    .min(3, 'Your First Name Must Include 3 Character'),
  lastName: zod
    .string({ required_error: 'You Must Provide Your Last Name' })
    .min(3, 'Your First Name Must Include 3 Character'),
  phone: zod
    .string({ required_error: 'You Must Provide Your Phone Number' })
    .length(11, 'Your Phone Number Has Invalid Format'),
});
