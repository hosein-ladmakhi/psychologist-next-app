"use client";

import Table from "@/components/Table";
import { useState, useTransition } from "react";
import { TTherapistsScreenFC } from "./index.type";
import { therapistsColumns } from "./index.constant";
import { TAdditionalTableAction } from "@/types/base.model";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useStoreDispatch } from "@/hooks/useStoreDispatch";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { TFilterTherapistFormValidation } from "./components/FilterTherapistDialog/index.type";
import { FILTER_THERAPIST_SUBJECT } from "./components/FilterTherapistDialog/index.constant";
import { VIEW_THERAPIST_SUBJECT } from "./components/ViewTherapistDialog/index.constant";
import { ITherapist } from "@/types/therapist.model";
import { SCHEDULE_THERAPIST_DIALOG_SUBJECT } from "./components/ScheduleTherapistDialog/index.constant";
import { UPSERT_THERAPIST_DIALOG_SUBJECT } from "./components/CreateOrEditTherapistDialog/index.constant";
import { deleteTherapistAction } from "@/app/(admin)/admin/therapists/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { useFilterDialogLoad } from "./useFilterDialogLoad";
import { useCreateOrEditDialogLoad } from "./useCreateOrEditDialogLoad";
import { useViewDialogLoad } from "./useViewDialogLoad";
import { useScheduleDialogLoad } from "./useScheduleDialogLoad";

const TherapistsScreen: TTherapistsScreenFC = ({ data, total, page }) => {
  const dispatch = useStoreDispatch();
  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist>();
  const [pending, handleTransition] = useTransition();

  const filterDialog = useFilterDialogLoad();
  const createOrEditDialog = useCreateOrEditDialogLoad();
  const viewDialog = useViewDialogLoad();
  const scheduleDialog = useScheduleDialogLoad();

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  const handleFilter = () => {
    dispatch(openModal(FILTER_THERAPIST_SUBJECT));
    filterDialog.loadComponent();
  };

  const onCloseDialog = () => {
    setSelectedTherapist(undefined);
    dispatch(closeModal());
    filterDialog.unLoadComponent();
    viewDialog.unLoadComponent();
    createOrEditDialog.unLoadComponent();
    scheduleDialog.unLoadComponent();
  };

  const onChangeFilters = (data: TFilterTherapistFormValidation) => onChangeMultipleSearchParams({ ...data, page: 1 });

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
    viewDialog.loadComponent();
  };

  const handleScheduleTherapistDialog = (data: Object) => {
    dispatch(openModal(SCHEDULE_THERAPIST_DIALOG_SUBJECT));
    setSelectedTherapist(data as any);
    scheduleDialog.loadComponent();
  };

  const additionalActions: TAdditionalTableAction[] = [
    {
      color: "secondary",
      onClick: handleViewTherapist,
      text: "View",
    },
    {
      color: "success",
      onClick: handleScheduleTherapistDialog,
      text: "Plan",
    },
  ];

  const handleCreate = () => {
    dispatch(openModal(UPSERT_THERAPIST_DIALOG_SUBJECT));
    createOrEditDialog.loadComponent();
  };

  const handleEdit = (data: any) => {
    dispatch(openModal(UPSERT_THERAPIST_DIALOG_SUBJECT));
    setSelectedTherapist(data);
    createOrEditDialog.loadComponent();
  };

  const handleDelete = (therapist: any) => {
    handleTransition(async () => {
      const res = await deleteTherapistAction(therapist.id);
      if (res) successNotify("Deleted Successfully ...");
      else errorNotify("Delete Process Failed ...");
    });
  };

  return (
    <>
      {createOrEditDialog.Component && <createOrEditDialog.Component selectedTherapist={selectedTherapist} onClose={onCloseDialog} />}
      {viewDialog.Component && <viewDialog.Component onClose={onCloseDialog} selectedTherapist={selectedTherapist} />}
      {filterDialog.Component && <filterDialog.Component onChangeFilters={onChangeFilters} onClose={onCloseDialog} />}
      {scheduleDialog.Component && <scheduleDialog.Component onClose={onCloseDialog} selectedTherapist={selectedTherapist} />}

      <Table
        additionalActions={additionalActions}
        handleResetFilter={handleResetFilter}
        createButtonLabel="Create New Therapist"
        title="Therapists Page"
        columns={therapistsColumns}
        dataKey="id"
        rows={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        handleChangePage={handleChangePage}
        handleFilter={handleFilter}
        currentPage={page}
        totalPage={total}
        loading={pending}
      />
    </>
  );
};

export default TherapistsScreen;
