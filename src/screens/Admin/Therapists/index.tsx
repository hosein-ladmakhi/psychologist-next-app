"use client";

import Table from "@/components/Table";
import { FC, useState, useTransition } from "react";
import { ITherapistsScreenProps } from "./index.type";
import { therapistsColumns } from "./index.constant";
import { TAdditionalTableAction } from "@/types/base.model";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useStoreDispatch } from "@/hooks/useStoreDispatch";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import FilterTherapistDialog from "./components/FilterTherapistDialog";
import { TFilterTherapistFormValidation } from "./components/FilterTherapistDialog/index.type";
import { FILTER_THERAPIST_SUBJECT } from "./components/FilterTherapistDialog/index.constant";
import ViewTherapistDialog from "./components/ViewTherapistDialog";
import { VIEW_THERAPIST_SUBJECT } from "./components/ViewTherapistDialog/index.constant";
import { ITherapist } from "@/types/therapist.model";
import ScheduleTherapistDialog from "./components/ScheduleTherapistDialog";
import { SCHEDULE_THERAPIST_DIALOG_SUBJECT } from "./components/ScheduleTherapistDialog/index.constant";
import CreateOrEditTherapistDialog from "./components/CreateOrEditTherapistDialog";
import { UPSERT_THERAPIST_DIALOG_SUBJECT } from "./components/CreateOrEditTherapistDialog/index.constant";
import { deleteTherapistAction } from "@/app/(admin)/admin/therapists/actions";
import toast from "react-hot-toast";

const TherapistsScreen: FC<ITherapistsScreenProps> = ({ data, total, page }) => {
  const dispatch = useStoreDispatch();
  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist>();
  const [pending, handleTransition] = useTransition();

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  const handleFilter = () => dispatch(openModal(FILTER_THERAPIST_SUBJECT));

  const onCloseFilterTherapistDialog = () => dispatch(closeModal());

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
  };

  const handleScheduleTherapistDialog = (data: Object) => {
    dispatch(openModal(SCHEDULE_THERAPIST_DIALOG_SUBJECT));
    setSelectedTherapist(data as any);
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

  const onCloseScheduleTherapistDialog = () => {
    dispatch(closeModal());
  };

  const handleCreate = () => {
    dispatch(openModal(UPSERT_THERAPIST_DIALOG_SUBJECT));
  };

  const handleEdit = (data: any) => {
    dispatch(openModal(UPSERT_THERAPIST_DIALOG_SUBJECT));
    setSelectedTherapist(data);
  };

  const onCloseCreateOrEditTherapistDialog = () => {
    dispatch(closeModal());
  };

  const onCloseViewTherapistDialog = () => {
    setSelectedTherapist(undefined);
  };

  const handleDelete = (therapist: any) => {
    handleTransition(async () => {
      const res = await deleteTherapistAction(therapist.id);
      if (res) {
        toast.success("Deleted Successfully ...");
      } else {
        toast.error("Delete Process Failed ...");
      }
    });
  };

  return (
    <>
      <CreateOrEditTherapistDialog selectedTherapist={selectedTherapist} onClose={onCloseCreateOrEditTherapistDialog} />
      <ViewTherapistDialog onClose={onCloseViewTherapistDialog} selectedTherapist={selectedTherapist} />
      <FilterTherapistDialog onChangeFilters={onChangeFilters} onClose={onCloseFilterTherapistDialog} />
      <ScheduleTherapistDialog onClose={onCloseScheduleTherapistDialog} selectedTherapist={selectedTherapist} />
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
