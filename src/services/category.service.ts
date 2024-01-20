import { httpDelete, httpGet, httpPatch, httpPost } from '@/api';
import { API_URL } from '@/constants';
import {
  ICategory,
  TCategoryPageRes,
  TCreateOrEditCategoryBody,
} from '@/types/category.model';
import { prepareQueryParams } from '@/utils/prepareQueryParams';

export const getCategories = (filters: Object) =>
  httpGet<TCategoryPageRes>(
    `${API_URL}/categories${prepareQueryParams(filters)}`,
    undefined,
    ['categories'],
  );

export const deleteCategory = (id: number) =>
  httpDelete<ICategory>(`${API_URL}/categories/${id}`);

export const createCategory = (data: TCreateOrEditCategoryBody) =>
  httpPost<TCreateOrEditCategoryBody, ICategory>(`${API_URL}/categories`, data);

export const editCategory = (id: number, data: TCreateOrEditCategoryBody) =>
  httpPatch<TCreateOrEditCategoryBody, ICategory>(
    `${API_URL}/categories/${id}`,
    data,
  );
