import PatientsScreen from '@/screens/Admin/Patients';
import { getPatientsPageApi } from '@/services/patient.service';
import { INextPage } from '@/types/base.model';
import { FC } from 'react';

export const dynamic = 'force-update';

interface IHomePageSearchParams {
  page: string;
}

const PatientsPage: FC<INextPage<{}, IHomePageSearchParams>> = async ({
  searchParams,
}) => {
  const currentPage = +(searchParams.page || '1');
  const data = await getPatientsPageApi(currentPage);

  return (
    <PatientsScreen
      page={currentPage}
      data={data?.content}
      total={Math.ceil(data?.count / 10)}
    />
  );
};

export default PatientsPage;
