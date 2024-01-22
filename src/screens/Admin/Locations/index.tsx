"use client";

import Table from "@/components/Table";
import { TLocationsScreenFC } from "./index.type";
import { locationsColumns } from "./index.constant";

const LocationsScreen: TLocationsScreenFC = ({ count, data }) => {
  const handleDelete = () => {};
  const handleEdit = () => {};
  const handleCreate = () => {};

  return (
    <>
      <Table
        columns={locationsColumns}
        dataKey="id"
        rows={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        createButtonLabel="Create New Location"
      />
    </>
  );
};

export default LocationsScreen;
