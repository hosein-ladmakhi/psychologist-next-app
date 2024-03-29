"use client";

import Table from "@/components/Table";
import { IPatient } from "@/types/patient.model";
import { Suspense, useMemo, useState, useTransition } from "react";
import DeletePatientConfirmation from "./components/DeletePatientConfirmation";
import { TPatientsScreenFC } from "./index.type";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TFilterPatientFormValidation } from "./components/FilterPatientDialog/index.type";
import { TAdditionalTableAction } from "@/types/base.model";
import { patientsColumn } from "./index.constant";
import { errorNotify, successNotify } from "@/utils/notify";
import dynamic from "next/dynamic";
import { deletePatientAction } from "@/app/(admin)/patients/actions";
import EditPasswordDialog from "@/components/EditPasswordDailog";

const CreateOrEditPatientDialog = dynamic(() => import("./components/CreateOrEditPatientDialog"));
const ViewOrdersDialog = dynamic(() => import("./components/ViewOrdersDialog"));
const FilterPatientDialog = dynamic(() => import("./components/FilterPatientDialog"));

const PatientsScreen: TPatientsScreenFC = ({ data, totalPage, page, count }) => {
  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const [pending, handleTransition] = useTransition();

  const [isShowFilterDialog, setShowFilterDialogStatus] = useState<boolean>(false);
  const [isShowCreateOrEditDialog, setShowCreateOrEditDialogStatus] = useState<boolean>(false);
  const [isShowViewDialog, setShowViewDialogStatus] = useState<boolean>(false);
  const [isShowChangePasswordDialog, setShowChangePasswordDialogStatus] = useState<boolean>(false);

  const handleChangePage = (page: number) => onChangeSearchParams("page", page.toString());

  const handleDelete = (patient: Record<string, any>) => {
    handleTransition(async () => {
      if (patient.orders.length) {
        errorNotify("بیمار شما رزرو ثبت شده دارد, برای حذف بیمار ابتدا باید رزرو های مرتبط به این بیمار را حذف کنید");
      } else {
        const res = await deletePatientAction(patient as IPatient);
        if (res) successNotify(`بیمار ${patient.firstName} ${patient.lastName} با موفقیت حذف گردید`);
        else errorNotify("عملیات حذف بیمار با شکست مواجعه شد");
      }
      onCloseDialog();
    });
  };

  const handleCreate = () => {
    setShowCreateOrEditDialogStatus(true);
  };

  const handleEdit = (data: any) => {
    setSelectedPatient(data);
    setShowCreateOrEditDialogStatus(true);
  };

  const handleFilter = () => {
    setShowFilterDialogStatus(true);
  };

  const onChangeFilters = (data: TFilterPatientFormValidation) => onChangeMultipleSearchParams(data);

  const onCloseDialog = () => {
    setSelectedPatient(undefined);
    setShowCreateOrEditDialogStatus(false);
    setShowFilterDialogStatus(false);
    setShowViewDialogStatus(false);
    setShowChangePasswordDialogStatus(false);
  };

  const handleEditPassword = (data: Object) => {
    const patient = data as IPatient;
    setShowChangePasswordDialogStatus(true);
    setSelectedPatient(patient);
  };

  const handleEditPasswordClose = () => {
    setSelectedPatient(undefined);
    setShowChangePasswordDialogStatus(false);
  };

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({
      firstName: undefined,
      lastName: undefined,
      phone: undefined,
    });
  };

  const handleViewPatient = (data: Object) => {
    setSelectedPatient(data as IPatient);
    setShowViewDialogStatus(true);
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
      onClick: handleEditPassword,
      text: "تغییر گذرواژه",
    },
  ];

  return (
    <>
      {isShowViewDialog && (
        <Suspense fallback={<></>}>
          <ViewOrdersDialog selectedPatient={selectedPatient} />
        </Suspense>
      )}
      {isShowCreateOrEditDialog && (
        <Suspense fallback={<></>}>
          <CreateOrEditPatientDialog selectedPatient={selectedPatient} onClose={onCloseDialog} />
        </Suspense>
      )}
      {isShowFilterDialog && (
        <Suspense fallback={<></>}>
          <FilterPatientDialog onChangeFilters={onChangeFilters} onClose={onCloseDialog} />
        </Suspense>
      )}
      {isShowChangePasswordDialog && (
        <Suspense>
          <EditPasswordDialog handleClose={handleEditPasswordClose} id={selectedPatient!.id} type="patient" />
        </Suspense>
      )}
      <Table
        handleResetFilter={handleResetFilter}
        createButtonLabel="افزودن بیمار"
        title={`لیست بیماران (${count})`}
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
        totalPage={totalPage}
        deleteConfirmationDescription={DeletePatientConfirmation}
        additionalActions={additionalActions}
      />
    </>
  );
};

export default PatientsScreen;
