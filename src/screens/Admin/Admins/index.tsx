"use client";

import { useMemo, useState, Suspense, useTransition } from "react";
import Table from "@/components/Table";
import { TAdminsScreenFC } from "./index.type";
import { adminsColumns } from "./index.constant";
import { IAdmin } from "@/types/admin.model";
import dynamic from "next/dynamic";
import { TAdditionalTableAction } from "@/types/base.model";
import { deleteAdminAction } from "@/app/(admin)/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import FilterAdminsDialog from "@/screens/Admin/Admins/components/FilterAdminsDialog";
import { useSearchParams } from "@/hooks/useSearchParams";

const EditPasswordDialog = dynamic(() => import("@/components/EditPasswordDailog"));

const CreateOrEditAdminDialog = dynamic(() => import("./components/CreateOrEditAdminDialog"));

const AdminsScreen: TAdminsScreenFC = ({ data, page, count, totalPage }) => {
  const [loading, handleTransition] = useTransition();

  const [isUpsertAdminOpen, setUpsertAdminOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin>();
  const [isEditPasswordOpen, setEditPasswordOpen] = useState<boolean>(false);
  const [isFilterAdminOpen, setFilterAdminOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();

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

  const handleDelete = (data: Object) => {
    handleTransition(() => {
      const admin = data as IAdmin;
      deleteAdminAction(admin.id).then(res => {
        console.log("ssss", res);
        if (res) {
          successNotify("ادمین با موفقیت حذف گردید");
        } else {
          errorNotify("عملیات ساخت ادمین با شکست مواجعه شد");
        }
      }).catch(() => {
        errorNotify("عملیات ساخت ادمین با شکست مواجعه شد");
      });
    });
  };

  const handleFilter = () => {
    setFilterAdminOpen(true);
  };

  const handleFilterClose = () => {
    setFilterAdminOpen(false);
  };

  const handleResetFilter = () => {
    searchParams.onChangeMultipleSearchParams({
      firstName: undefined,
      lastName: undefined,
      phone: undefined,
      isActive: undefined,
      page: 1
    });
  };

  const handleChangePage = (page: number) => {
    searchParams.onChangeSearchParams("page", page);
  };


  const additionalActions: TAdditionalTableAction[] = [
    {
      color: "info",
      onClick: handleEditPassword,
      text: "ویرایش پسورد"
    }
  ];

  const transformedData = useMemo(() => {
    return data.map((element) => ({ ...element, transformedIsActive: element.isActive ? "فعال" : "غیرفعال" }));
  }, [data]);

  return (
    <>
      {isUpsertAdminOpen && (
        <Suspense fallback={<></>}>
          <CreateOrEditAdminDialog handleClose={handleUpsertAdminClose} isOpen={isUpsertAdminOpen}
                                   selectedAdmin={selectedAdmin} />
        </Suspense>
      )}
      {isFilterAdminOpen && (
        <Suspense fallback={<></>}>
          <FilterAdminsDialog handleClose={handleFilterClose} />
        </Suspense>
      )}
      <Table
        additionalActions={additionalActions}
        currentPage={page}
        totalPage={totalPage}
        handleChangePage={handleChangePage}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleFilter={handleFilter}
        handleCreate={handleCreate}
        handleResetFilter={handleResetFilter}
        createButtonLabel="ساخت ادمین جدید"
        columns={adminsColumns}
        dataKey="id"
        title={`لیست ادمین ها (${count})`}
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
