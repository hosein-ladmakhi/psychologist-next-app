"use client";

import Table from "@/components/Table";
import { IPatient } from "@/types/patient.model";
import { cloneElement, useMemo, useState, useTransition } from "react";
import DeletePatientConfirmation from "./components/DeletePatientConfirmation";
import { deletePatientAction } from "@/app/(admin)/admin/patients/actions";
import { TPatientsScreenFC } from "./index.type";
import { UPSERT_PATIENT_SUBJECT } from "./components/CreateOrEditPatientDialog/index.constant";
import FilterPatientDialog from "./components/FilterPatientDialog";
import { FILTER_PATIENT_SUBJECT } from "./components/FilterPatientDialog/index.constant";
import { useStoreDispatch } from "@/hooks/useStoreDispatch";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TFilterPatientFormValidation } from "./components/FilterPatientDialog/index.type";
import { TAdditionalTableAction } from "@/types/base.model";
import ViewOrdersDialog from "./components/ViewOrdersDialog";
import { VIEW_ORDERS_DIALOG } from "./components/ViewOrdersDialog/index.constant";
import { patientsColumn } from "./index.constant";
import { useCreateOrEditDialogLoad } from "./useCreateOrEditDialogLoad";
import { errorNotify, successNotify } from "@/utils/notify";

const PatientsScreen: TPatientsScreenFC = ({ data, total, page }) => {
  const dispatch = useStoreDispatch();
  const createOrEditDialog = useCreateOrEditDialogLoad();
  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const [pending, handleTransition] = useTransition();

  const handleChangePage = (page: number) => onChangeSearchParams("page", page.toString());

  const handleDelete = (patient: Record<string, any>) => {
    handleTransition(async () => {
      if (patient.orders.length) {
        errorNotify("Your Patient have orders, please first delete orders and after that try again");
      } else {
        const res = await deletePatientAction(patient as IPatient);
        if (res) successNotify(`The ${patient.firstName} ${patient.lastName} has deleted successfully ...`);
        else errorNotify("The patient not deleted, try again");
      }
      onCloseDialog();
    });
  };

  const handleCreate = () => {
    dispatch(openModal(UPSERT_PATIENT_SUBJECT));
    createOrEditDialog.loadComponent();
  };

  const handleEdit = (data: any) => {
    setSelectedPatient(data);
    dispatch(openModal(UPSERT_PATIENT_SUBJECT));
    createOrEditDialog.loadComponent();
  };

  const handleFilter = () => dispatch(openModal(FILTER_PATIENT_SUBJECT));

  const onChangeFilters = (data: TFilterPatientFormValidation) => onChangeMultipleSearchParams(data);

  const onCloseDialog = () => {
    dispatch(closeModal());
    setSelectedPatient(undefined);
    createOrEditDialog.unLoadComponent();
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
      color: "success",
      onClick: (data) => {
        setSelectedPatient(data as IPatient);
        dispatch(openModal(VIEW_ORDERS_DIALOG));
      },
      text: "Orders",
    },
  ];

  return (
    <>
      <ViewOrdersDialog selectedPatient={selectedPatient} />
      {createOrEditDialog.Component && <createOrEditDialog.Component selectedPatient={selectedPatient} onClose={onCloseDialog} />}
      <FilterPatientDialog onChangeFilters={onChangeFilters} onClose={onCloseDialog} />
      <Table
        handleResetFilter={handleResetFilter}
        createButtonLabel="Create New Patient"
        title="Patients Page"
        columns={patientsColumn}
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
