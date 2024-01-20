'use client';

import Table from '@/components/Table';
import { FC, useState } from 'react';
import { ITherapistsScreenProps } from './index.type';
import { therapistsColumns } from './index.constant';
import { TAdditionalTableAction } from '@/types/base.model';
import { useSearchParams } from '@/hooks/useSearchParams';
import { useStoreDispatch } from '@/hooks/useStoreDispatch';
import { closeModal, openModal } from '@/store/slices/modalSlices';
import FilterTherapistDialog from './components/FilterTherapistDialog';
import { TFilterTherapistFormValidation } from './components/FilterTherapistDialog/index.type';
import { FILTER_THERAPIST_SUBJECT } from './components/FilterTherapistDialog/index.constant';
import ViewTherapistDialog from './components/ViewTherapistDialog';
import { VIEW_THERAPIST_SUBJECT } from './components/ViewTherapistDialog/index.constant';
import { ITherapist } from '@/types/therapist.model';

const TherapistsScreen: FC<ITherapistsScreenProps> = ({
  data,
  total,
  page,
}) => {
  const { onChangeSearchParams, onChangeMultipleSearchParams } =
    useSearchParams();
  const dispatch = useStoreDispatch();
  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist>();

  const handleChangePage = (page: number) => {
    onChangeSearchParams('page', page.toString());
  };

  const handleFilter = () => {
    dispatch(openModal(FILTER_THERAPIST_SUBJECT));
  };

  const onCloseFilterTherapistDialog = () => {
    dispatch(closeModal());
  };

  const onChangeFilters = (data: TFilterTherapistFormValidation) => {
    onChangeMultipleSearchParams({ ...data, page: 1 });
  };

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({
      firstName: undefined,
      lastName: undefined,
      phone: undefined,
    });
  };

  const handleViewTherapist = (data: Object) => {
    dispatch(openModal(VIEW_THERAPIST_SUBJECT));
    setSelectedTherapist(data as any);
  };

  const additionalActions: TAdditionalTableAction[] = [
    {
      color: 'secondary',
      onClick: handleViewTherapist,
      text: 'View',
    },
  ];

  return (
    <>
      <ViewTherapistDialog selectedTherapist={selectedTherapist} />
      <FilterTherapistDialog
        onChangeFilters={onChangeFilters}
        onClose={onCloseFilterTherapistDialog}
      />
      <Table
        additionalActions={additionalActions}
        handleResetFilter={handleResetFilter}
        createButtonLabel="Create New Therapist"
        title="Therapists Page"
        columns={therapistsColumns}
        dataKey="id"
        rows={data}
        handleDelete={() => {}}
        handleEdit={() => {}}
        handleCreate={() => {}}
        handleChangePage={handleChangePage}
        handleFilter={handleFilter}
        currentPage={page}
        totalPage={total}
      />
    </>
  );
};

export default TherapistsScreen;
