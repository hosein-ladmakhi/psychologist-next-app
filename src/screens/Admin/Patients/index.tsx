'use client';

import Table from '@/components/Table';
import { ITableColumn } from '@/components/Table/index.type';
import { IPatient } from '@/types/patient.model';
import { FC, useMemo, useState, useTransition } from 'react';
import DeletePatientConfirmation from './components/DeletePatientConfirmation';
import { deletePatientAction } from '@/app/(admin)/admin/patients/actions';
import { IPatientsProps } from './index.type';
import toast from 'react-hot-toast';
import CreateOrEditPatientDialog from './components/CreateOrEditPatientDialog';
import { UPSERT_PATIENT_SUBJECT } from './components/CreateOrEditPatientDialog/index.constant';
import FilterPatientDialog from './components/FilterPatientDialog';
import { FILTER_PATIENT_SUBJECT } from './components/FilterPatientDialog/index.constant';
import { useStoreDispatch } from '@/hooks/useStoreDispatch';
import { closeModal, openModal } from '@/store/slices/modalSlices';
import { useSearchParams } from '@/hooks/useSearchParams';
import { TFilterPatientFormValidation } from './components/FilterPatientDialog/index.type';
import { TAdditionalTableAction } from '@/types/base.model';
import ViewOrdersDialog from './components/ViewOrdersDialog';
import { VIEW_ORDERS_DIALOG } from './components/ViewOrdersDialog/index.constant';

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
  const dispatch = useStoreDispatch();
  const { onChangeSearchParams, onChangeMultipleSearchParams } =
    useSearchParams();
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const [pending, handleTransition] = useTransition();

  const handleChangePage = (page: number) => {
    onChangeSearchParams('page', page.toString());
  };

  const handleDelete = (patient: Record<string, any>) => {
    handleTransition(() => {
      if (patient.orders.length) {
        toast.error(
          'Your Patient have orders, please first delete orders and after that try again',
        );
        return;
      }
      deletePatientAction(patient as IPatient).then((res) => {
        if (res)
          toast.success(
            `The ${patient.firstName} ${patient.lastName} has deleted successfully ...`,
          );
        else toast.error('The patient not deleted, try again');
      });
    });
  };

  const handleCreate = () => {
    dispatch(openModal(UPSERT_PATIENT_SUBJECT));
  };

  const onCloseCreateOrEditPatientDialog = () => {
    dispatch(closeModal());
  };

  const handleEdit = (data: any) => {
    setSelectedPatient(data);
    dispatch(openModal(UPSERT_PATIENT_SUBJECT));
  };

  const handleFilter = () => {
    dispatch(openModal(FILTER_PATIENT_SUBJECT));
  };

  const onCloseFilterPatientDialog = () => {
    dispatch(closeModal());
  };

  const onChangeFilters = (data: TFilterPatientFormValidation) => {
    onChangeMultipleSearchParams(data);
  };

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({
      firstName: undefined,
      lastName: undefined,
      phone: undefined,
    });
  };

  const transformedData = useMemo(() => {
    return (
      data?.map((patient) => ({
        ...patient,
        ordersCount: patient.orders.length,
      })) || []
    );
  }, [data]);

  const additionalActions: TAdditionalTableAction[] = [
    {
      color: 'success',
      onClick: (data) => {
        setSelectedPatient(data as IPatient);
        dispatch(openModal(VIEW_ORDERS_DIALOG));
      },
      text: 'Orders',
    },
  ];

  return (
    <>
      <ViewOrdersDialog selectedPatient={selectedPatient} />
      <CreateOrEditPatientDialog
        selectedPatient={selectedPatient}
        onClose={onCloseCreateOrEditPatientDialog}
      />
      <FilterPatientDialog
        onChangeFilters={onChangeFilters}
        onClose={onCloseFilterPatientDialog}
      />
      <Table
        handleResetFilter={handleResetFilter}
        createButtonLabel="Create New Patient"
        title="Patients Page"
        columns={columns}
        dataKey="id"
        rows={transformedData}
        loading={pending}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        handleChangePage={handleChangePage}
        handleFilter={handleFilter}
        currentPage={page}
        totalPage={total}
        deleteConfirmationDescription={DeletePatientConfirmation}
        additionalActions={additionalActions}
      />
    </>
  );
};

export default PatientsScreen;
