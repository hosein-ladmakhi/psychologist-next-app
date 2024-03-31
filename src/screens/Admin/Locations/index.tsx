"use client";

import Table from "@/components/Table";
import { TLocationsScreenFC } from "./index.type";
import { locationsColumns } from "./index.constant";
import { Suspense, useState, useTransition } from "react";
import { ILocation } from "@/types/location.model";
import { errorNotify, successNotify } from "@/core/notification";
import { useSearchParams } from "@/hooks/useSearchParams";
import dynamic from "next/dynamic";
import { deleteLocationAction } from "@/app/(admin)/locations/actions";

const CreateOrEditLocationDialog = dynamic(() => import("./components/CreateOrEditLocationDialog"));

const LocationsScreen: TLocationsScreenFC = ({ count, data, page, totalPage }) => {
  const [isShowCreateOrEditDialog, setShowCreateOrEditDialogStatus] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<ILocation>();
  const { onChangeSearchParams } = useSearchParams();
  const [pending, handleTransition] = useTransition();

  const onCloseDialog = () => {
    setSelectedLocation(undefined);
    setShowCreateOrEditDialogStatus(false);
  };

  const handleDelete = (data: any) => {
    handleTransition(async () => {
      const res = await deleteLocationAction(data?.id);
      if (res) successNotify("آدرس مورد نظر با موفقیت حذف گردید");
      else errorNotify("عملیات حذف آدرس با شکست مواجعه شد");
    });
  };

  const handleEdit = (data: any) => {
    setSelectedLocation(data);
    setShowCreateOrEditDialogStatus(true);
  };

  const handleCreate = () => {
    setShowCreateOrEditDialogStatus(true);
  };


  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  return (
    <>
      {isShowCreateOrEditDialog && (
        <Suspense fallback={<></>}>
          <CreateOrEditLocationDialog selectedLocation={selectedLocation} onClose={onCloseDialog} />
        </Suspense>
      )}
      <Table
        handleChangePage={handleChangePage}
        loading={pending}
        title={`لیست آدرس ها (${count})`}
        columns={locationsColumns}
        dataKey="id"
        rows={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        createButtonLabel="افزودن آدرس جدید"
        currentPage={page}
        totalPage={totalPage}
      />
    </>
  );
};

export default LocationsScreen;
