"use client";

import { useMemo, useState, Suspense } from "react";
import Table from "@/components/Table";
import { TAdminsScreenFC } from "./index.type";
import { adminsColumns } from "./index.constant";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { IAdmin } from "@/types/admin.model";
import dynamic from "next/dynamic";
import { TAdditionalTableAction } from "@/types/base.model";

const EditPasswordDialog = dynamic(() => import("@/components/EditPasswordDailog"));

const CreateOrEditAdminDialog = dynamic(() => import("./components/CreateOrEditAdminDialog"));

const AdminsScreen: TAdminsScreenFC = ({ data, page, total }) => {
  const [isUpsertAdminOpen, setUpsertAdminOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin>();
  const [isEditPasswordOpen, setEditPasswordOpen] = useState<boolean>(false);

  const handleCreate = () => {
    setUpsertAdminOpen(true);
  };

  const handleUpsertAdminClose = () => {
    setUpsertAdminOpen(false);
    setSelectedAdmin(undefined);
  };

  const handleEdit = (data: any) => {
    const admin = data as IAdmin;
    setSelectedAdmin(admin);
    setUpsertAdminOpen(true);
  };

  const handleEditPassword = (data: any) => {
    const admin = data as IAdmin;
    setSelectedAdmin(admin);
    setEditPasswordOpen(true);
  };

  const handleCloseEditPassword = () => {
    setSelectedAdmin(undefined);
    setEditPasswordOpen(false);
  };

  const additionalActions: TAdditionalTableAction[] = [
    {
      color: "info",
      onClick: handleEditPassword,
      text: "ویرایش پسورد",
    },
  ];

  const transformedData = useMemo(() => {
    return data.map((element) => ({ ...element, transformedIsActive: element.isActive ? "فعال" : "غیرفعال" }));
  }, [data]);

  return (
    <>
      {isUpsertAdminOpen && (
        <Suspense fallback={<></>}>
          <CreateOrEditAdminDialog handleClose={handleUpsertAdminClose} isOpen={isUpsertAdminOpen} selectedAdmin={selectedAdmin} />
        </Suspense>
      )}
      <Table
        additionalActions={additionalActions}
        currentPage={page}
        totalPage={calculateTotalPageTable(total)}
        handleChangePage={() => {}}
        handleDelete={() => {}}
        handleEdit={handleEdit}
        handleFilter={() => {}}
        handleCreate={handleCreate}
        handleResetFilter={() => {}}
        createButtonLabel="ساخت ادمین جدید"
        columns={adminsColumns}
        dataKey="id"
        title={`لیست ادمین ها (${total})`}
        rows={transformedData}
      />

      {isEditPasswordOpen && selectedAdmin && (
        <Suspense fallback={<></>}>
          <EditPasswordDialog handleClose={handleCloseEditPassword} id={selectedAdmin!.id} type="admin" />
        </Suspense>
      )}
    </>
  );
};

export default AdminsScreen;
