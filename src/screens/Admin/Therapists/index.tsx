"use client";

import Table from "@/components/Table";
import { Suspense, useMemo, useState, useTransition } from "react";
import { TTherapistsScreenFC } from "./index.type";
import { therapistsColumns } from "./index.constant";
import { TAdditionalTableAction } from "@/types/base.model";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TFilterTherapistFormValidation } from "./components/FilterTherapistDialog/index.type";
import { ITherapist } from "@/types/therapist.model";
import { errorNotify, successNotify } from "@/utils/notify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import FilterTherapistDialog from "./components/FilterTherapistDialog";
import CreateOrEditTherapistDialog from "./components/CreateOrEditTherapistDialog";
import { getGenderEnum } from "@/utils/getEnumTransformer";
import { deleteTherapistAction } from "@/app/(admin)/therapists/actions";
import EditPasswordDialog from "@/components/EditPasswordDailog";

const ViewTherapistDialog = dynamic(() => import("./components/ViewTherapistDialog"));
const ScheduleTherapistDialog = dynamic(() => import("./components/ScheduleTherapistDialog"));

const TherapistsScreen: TTherapistsScreenFC = ({ data, totalPage, page, count }) => {
  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist>();
  const [pending, handleTransition] = useTransition();
  const router = useRouter();

  const [isShowViewDialog, setShowViewDialogStatus] = useState<boolean>(false);
  const [isShowScheduleDialog, setShowScheduleDialogStatus] = useState<boolean>(false);
  const [isShowFilterDialog, setShowFilterDialogStatus] = useState<boolean>(false);
  const [isShowCreateOrEditDialog, setShowCreateOrEditDialogStatus] = useState<boolean>(false);
  const [isShowChangePasswordDialog, setShowChangePasswordDialogStatus] = useState<boolean>(false);

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  const handleFilter = () => {
    setShowFilterDialogStatus(true);
  };

  const onCloseDialog = () => {
    setSelectedTherapist(undefined);
    setShowFilterDialogStatus(false);
    setShowViewDialogStatus(false);
    setShowScheduleDialogStatus(false);
    setShowCreateOrEditDialogStatus(false);
    setShowChangePasswordDialogStatus(false);
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
    setSelectedTherapist(data as any);
    setShowViewDialogStatus(true);
  };

  const handleScheduleTherapistDialog = (data: Object) => {
    setSelectedTherapist(data as any);
    setShowScheduleDialogStatus(true);
  };

  const handleScheduleTherapistOffDay = (data: Object) => {
    const therapist = data as ITherapist;
    router.push(`/admin/therapists/off-day/${therapist.id}`);
  };

  const handleEditPassword = (data: Object) => {
    const therapist = data as ITherapist;
    setShowChangePasswordDialogStatus(true);
    setSelectedTherapist(therapist);
  };

  const handleEditPasswordClose = () => {
    setSelectedTherapist(undefined);
    setShowChangePasswordDialogStatus(false);
  };

  const additionalActions: TAdditionalTableAction[] = [
    {
      color: "secondary",
      onClick: handleViewTherapist,
      text: "جزئیات",
    },
    {
      color: "success",
      onClick: handleScheduleTherapistDialog,
      text: "چارت رزرو",
    },
    {
      color: "warning",
      onClick: handleScheduleTherapistOffDay,
      text: "مرخصی",
    },
    {
      color: "info",
      onClick: handleEditPassword,
      text: "ویرایش گذرواژه",
    },
  ];

  const handleCreate = () => {
    setShowCreateOrEditDialogStatus(true);
  };

  const handleEdit = (data: any) => {
    setSelectedTherapist(data);
    setShowCreateOrEditDialogStatus(true);
  };

  const handleDelete = (therapist: any) => {
    handleTransition(async () => {
      const res = await deleteTherapistAction(therapist.id);
      if (res) successNotify("Deleted Successfully ...");
      else errorNotify("Delete Process Failed ...");
    });
  };

  const tranformedData = useMemo(() => {
    return data.map((therapist) => ({
      ...therapist,
      fullName: therapist.firstName + " " + therapist.lastName,
      transformedGender: getGenderEnum(therapist.gender),
    }));
  }, [data]);

  return (
    <>
      {isShowCreateOrEditDialog && (
        <Suspense fallback={<></>}>
          <CreateOrEditTherapistDialog selectedTherapist={selectedTherapist} onClose={onCloseDialog} />
        </Suspense>
      )}
      {isShowViewDialog && (
        <Suspense fallback={<></>}>
          <ViewTherapistDialog onClose={onCloseDialog} selectedTherapist={selectedTherapist} />
        </Suspense>
      )}
      {isShowScheduleDialog && (
        <Suspense fallback={<></>}>
          <ScheduleTherapistDialog onClose={onCloseDialog} selectedTherapist={selectedTherapist} />
        </Suspense>
      )}
      {isShowFilterDialog && (
        <Suspense fallback={<></>}>
          <FilterTherapistDialog onChangeFilters={onChangeFilters} onClose={onCloseDialog} />
        </Suspense>
      )}
      {isShowChangePasswordDialog && (
        <Suspense>
          <EditPasswordDialog handleClose={handleEditPasswordClose} id={selectedTherapist!.id} type="therapist" />
        </Suspense>
      )}

      <Table
        additionalActions={additionalActions}
        handleResetFilter={handleResetFilter}
        createButtonLabel="ساخت پزشک جدید"
        title={`لیست پزشکان (${count})`}
        columns={therapistsColumns}
        dataKey="id"
        rows={tranformedData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        handleChangePage={handleChangePage}
        handleFilter={handleFilter}
        currentPage={page}
        totalPage={totalPage}
        loading={pending}
      />
    </>
  );
};

export default TherapistsScreen;
