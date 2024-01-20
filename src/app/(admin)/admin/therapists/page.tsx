import TherapistsScreen from '@/screens/Admin/Therapists';
import { getTherapists } from '@/services/therapist.service';
import { INextPage } from '@/types/base.model';
import { calculateTotalPageTable } from '@/utils/calculateTotalPageTable';
import { FC } from 'react';
import { ITherapistsPageSearchParams } from './page.type';

const prepareQueryParam = (data: ITherapistsPageSearchParams) => {
  const result: Record<string, any> = {};
  if (data.firstName) result['firstName.startWith'] = data.firstName;
  if (data.lastName) result['lastName.startWith'] = data.lastName;
  if (data.phone) result['phone.startWith'] = data.phone;
  return { ...result, page: isNaN(+data.page) ? '0' : +data.page - 1 };
};

const TherapistsPage: FC<INextPage<{}, ITherapistsPageSearchParams>> = async ({
  searchParams,
}) => {
  const currentPage = +(searchParams.page || '1');
  const therapists = await getTherapists(prepareQueryParam(searchParams));

  return (
    <TherapistsScreen
      data={therapists?.content}
      page={currentPage}
      total={calculateTotalPageTable(therapists.count)}
    />
  );
};

export default TherapistsPage;
