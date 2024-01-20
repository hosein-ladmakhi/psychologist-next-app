import { ICategory } from '@/types/category.model';

export interface IFilterCategoryDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterCategoryFormValidation) => void;
}

export type TFilterCategoryFormValidation = Partial<
  Pick<ICategory, 'enName' | 'faName'>
>;
