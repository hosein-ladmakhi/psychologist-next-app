import { ICategory } from '@/types/category.model';

export interface ICategoriesScreenProps {
  data: ICategory[];
  total: number;
  page: number;
}
