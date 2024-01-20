'use server';

import {
  createCategory,
  deleteCategory,
  editCategory,
} from '@/services/category.service';
import { TCreateOrEditCategoryBody } from '@/types/category.model';
import { revalidateTag } from 'next/cache';

export const deleteCategoryAction = async (id: number) => {
  const res = await deleteCategory(id);
  if (res) {
    revalidateTag('categories');
    return true;
  }
  return false;
};

export const createNewCategoryAction = async (
  data: TCreateOrEditCategoryBody,
) => {
  const res = await createCategory(data);
  if (res) {
    revalidateTag('categories');
    return true;
  }
  return false;
};

export const editCategoryAction = async (
  id: number,
  data: TCreateOrEditCategoryBody,
) => {
  const res = await editCategory(id, data);
  if (res) {
    revalidateTag('categories');
    return true;
  }
  return false;
};
