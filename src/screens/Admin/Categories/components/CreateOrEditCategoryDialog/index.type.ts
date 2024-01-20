import * as zod from 'zod';
import { createOrEditCategoryFormValidation } from './index.constant';
import { ICategory } from '@/types/category.model';

export interface ICreateOrEditCategoryDialogProps {
  onClose: () => void;
  selectedCategory?: ICategory;
}

export type TCreateOrEditCategoryFormValidation = zod.infer<
  typeof createOrEditCategoryFormValidation
>;
