import CategoriesScreen from '@/screens/Admin/Categories';
import { getCategories } from '@/services/category.service';
import { calculateTotalPageTable } from '@/utils/calculateTotalPageTable';
import { FC } from 'react';
import { ICategoriesSearchParams } from './page.type';
import { INextPage } from '@/types/base.model';

const prepareQueryParam = (data: ICategoriesSearchParams) => {
  const result: Record<string, any> = {};
  if (data.enName) result['enName.eq'] = data.enName;
  if (data.faName) result['faName.eq'] = data.faName;
  if (data.page) {
    result.page = isNaN(+data.page) ? '0' : +data.page - 1;
  }
  return result;
};

const CategoriesPage: FC<INextPage<{}, ICategoriesSearchParams>> = async ({
  searchParams,
}) => {
  const currentPage = +(searchParams.page || '1');
  const res = await getCategories(prepareQueryParam(searchParams));

  return (
    <CategoriesScreen
      data={res?.content}
      total={calculateTotalPageTable(res?.count)}
      page={currentPage}
    />
  );
};

export default CategoriesPage;
