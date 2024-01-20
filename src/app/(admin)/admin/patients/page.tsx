import PatientsScreen from '@/screens/Admin/Patients';
import { getPatientsPageApi } from '@/services/patient.service';
import { INextPage } from '@/types/base.model';
import { calculateTotalPageTable } from '@/utils/calculateTotalPageTable';
import { FC } from 'react';

export const dynamic = 'force-dynamic';

interface IHomePageSearchParams {
  page: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

const prepareQueryParam = (data: IHomePageSearchParams) => {
  const result: Record<string, any> = {};
  if (data.firstName) result['firstName.startWith'] = data.firstName;
  if (data.lastName) result['lastName.startWith'] = data.lastName;
  if (data.phone) result['phone.startWith'] = data.phone;
  return { ...result, page: isNaN(+data.page) ? '0' : +data.page - 1 };
};

const PatientsPage: FC<INextPage<{}, IHomePageSearchParams>> = async ({
  searchParams,
}) => {
  const currentPage = +(searchParams.page || '1');
  const data = await getPatientsPageApi(prepareQueryParam(searchParams));

  return (
    <PatientsScreen
      page={currentPage}
      data={data?.content}
      total={calculateTotalPageTable(data?.count)}
    />
  );
};

export default PatientsPage;
