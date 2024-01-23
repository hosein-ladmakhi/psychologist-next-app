"use client";

import Table from "@/components/Table";
import { TLocationsScreenFC } from "./index.type";
import { locationsColumns } from "./index.constant";
import { useState, useTransition } from "react";
import { ILocation } from "@/types/location.model";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { FILTER_LOCATION_DIALOG_SUBJECT } from "./components/FilterLocationDialog/index.constant";
import { UPSERT_LOCATION_DIALOG_SUBJECT } from "./components/CreateOrEditLocationDialog/index.constant";
import { deleteLocationAction } from "@/app/(admin)/admin/locations/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import CreateOrEditLocationDialog from "./components/CreateOrEditLocationDialog";
import FilterLocationDialog from "./components/FilterLocationDialog";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useFilterDialogLoad } from "./useFilterDialogLoad";
import { useCreateOrEditDialogLoad } from "./useCreateOrEditDialogLoad";

const LocationsScreen: TLocationsScreenFC = ({ count, data, page }) => {
  const dispatch = useDispatch();
  const filterDialog = useFilterDialogLoad();
  const createOrEditDialog = useCreateOrEditDialogLoad();
  const [selectedLocation, setSelectedLocation] = useState<ILocation>();
  const { onChangeSearchParams } = useSearchParams();
  const [pending, handleTransition] = useTransition();

  const onCloseDialog = () => {
    dispatch(closeModal());
    setSelectedLocation(undefined);
    filterDialog.unLoadComponent();
    createOrEditDialog.unLoadComponent();
  };

  const handleDelete = (data: any) => {
    handleTransition(async () => {
      const res = await deleteLocationAction(data?.id);
      if (res) successNotify("Location Deleted Successfully");
      else errorNotify("Location Creation Failed ...");
    });
  };

  const handleEdit = (data: any) => {
    dispatch(openModal(UPSERT_LOCATION_DIALOG_SUBJECT));
    setSelectedLocation(data);
    createOrEditDialog.loadComponent();
  };

  const handleCreate = () => {
    dispatch(openModal(UPSERT_LOCATION_DIALOG_SUBJECT));
    createOrEditDialog.loadComponent();
  };

  const handleFilter = () => {
    dispatch(openModal(FILTER_LOCATION_DIALOG_SUBJECT));
    filterDialog.loadComponent();
  };

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  return (
    <>
      {createOrEditDialog.Component && <createOrEditDialog.Component selectedLocation={selectedLocation} onClose={onCloseDialog} />}
      {filterDialog.Component && <filterDialog.Component onClose={onCloseDialog} />}
      <Table
        handleChangePage={handleChangePage}
        loading={pending}
        title="Locations Page"
        columns={locationsColumns}
        dataKey="id"
        rows={data}
        handleFilter={handleFilter}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        createButtonLabel="Create New Location"
        currentPage={page}
        totalPage={count}
      />
    </>
  );
};

export default LocationsScreen;
