'use client';

import Table from '@/components/Table';
import { ITableColumn } from '@/components/Table/index.type';
import { useSearchParams } from '@/hooks/useSearchParams';
import { IPatient } from '@/types/patient.model';
import { Container } from '@mui/material';
import { FC, useTransition } from 'react';
import DeletePatientConfirmation from './components/DeletePatientConfirmation';
import { deletePatientAction } from '@/app/(admin)/admin/patients/actions';
import { IPatientsProps } from './index.type';

const columns: ITableColumn[] = [
  {
    label: 'Id',
    name: 'id',
    width: 100,
  },
  {
    label: 'First Name',
    name: 'firstName',
    width: 250,
  },
  {
    label: 'Last Name',
    name: 'lastName',
    width: 250,
  },
  {
    label: 'Phone',
    name: 'phone',
    width: 250,
  },
  {
    label: 'Orders Count',
    name: 'ordersCount',
    width: 250,
  },
];

const PatientsScreen: FC<IPatientsProps> = ({ data, total, page }) => {
  const onChangeSearchParams = useSearchParams();
  const [pending, handleTransition] = useTransition();

  const handleChangePage = (page: number) => {
    onChangeSearchParams('page', page.toString());
  };

  const handleDelete = (patient: Record<string, any>) => {
    handleTransition(() => {
      deletePatientAction(patient as IPatient);
    });
  };

  return (
    <Container style={{ marginBlock: '100px' }}>
      <Table
        createButtonLabel="Create New Patient"
        title="Patients Page"
        columns={columns}
        dataKey="id"
        rows={
          data?.map((patient) => ({
            ...patient,
            ordersCount: patient.orders.length,
          })) || []
        }
        loading={pending}
        handleDelete={handleDelete}
        handleEdit={() => {}}
        handleCreate={() => {}}
        handleChangePage={handleChangePage}
        handleFilter={() => {}}
        currentPage={page}
        totalPage={total}
        deleteConfirmationDescription={DeletePatientConfirmation}
      />
    </Container>
  );
};

export default PatientsScreen;
