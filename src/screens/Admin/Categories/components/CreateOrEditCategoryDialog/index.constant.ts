import * as zod from 'zod';

export const UPSERT_CATEGORY_SUBJECT = 'UPSERT_CATEGORY_SUBJECT';

export const createOrEditCategoryFormValidation = zod.object({
  faName: zod
    .string({ required_error: 'You Must Provide Your Farsi Name' })
    .min(3, 'Your Farsi Name Must Include 3 Character'),
  enName: zod
    .string({ required_error: 'You Must Provide Your English Name' })
    .min(3, 'Your English Name Must Include 3 Character'),
});
