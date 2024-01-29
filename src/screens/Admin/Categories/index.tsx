"use client";

import Table from "@/components/Table";
import { useState, useTransition } from "react";
import { categoriesColumns } from "./index.constant";
import { TCategoriesScreenFC } from "./index.type";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TFilterCategoryFormValidation } from "./components/FilterCategoryDialog/index.type";
import { deleteCategoryAction } from "@/app/(admin)/admin/categories/actions";
import { ICategory } from "@/types/category.model";
import { errorNotify, successNotify } from "@/utils/notify";
import dynamic from "next/dynamic";

const FilterCategoryDialog = dynamic(() => import("./components/FilterCategoryDialog"));
const CreateOrEditCategoryDialog = dynamic(() => import("./components/CreateOrEditCategoryDialog"));

const CategoriesScreen: TCategoriesScreenFC = ({ data, total, page }) => {
  const [pending, handleTransition] = useTransition();
  const [isShowFilterDialog, setShowFilterDialogStatus] = useState<boolean>(false);
  const [isShowCreateOrEditDialog, setShowCreateOrEditDialogStatus] = useState<boolean>(false);

  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({
      faName: undefined,
      enName: undefined,
      page: 1,
    });
  };

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  const handleFilter = () => {
    setShowFilterDialogStatus(true);
  };

  const onCloseDialog = () => {
    setSelectedCategory(undefined);
    setShowCreateOrEditDialogStatus(false);
    setShowFilterDialogStatus(false);
  };

  const handleDelete = (category: Record<string, any>) => {
    handleTransition(async () => {
      const res = await deleteCategoryAction(category.id);
      if (res) successNotify(`The ${category.enName} has deleted successfully ...`);
      else errorNotify("The category not deleted, try again");
      onCloseDialog();
    });
  };

  const onChangeFilters = (data: TFilterCategoryFormValidation) => onChangeMultipleSearchParams({ ...data, page: 1 });

  const handleCreate = () => {
    setShowCreateOrEditDialogStatus(true);
  };

  const handleEdit = (data: any) => {
    setSelectedCategory(data);
    setShowCreateOrEditDialogStatus(true);
  };

  return (
    <>
      {isShowFilterDialog && <FilterCategoryDialog onChangeFilters={onChangeFilters} onClose={onCloseDialog} />}
      {isShowCreateOrEditDialog && <CreateOrEditCategoryDialog onClose={onCloseDialog} selectedCategory={selectedCategory} />}
      <Table
        handleResetFilter={handleResetFilter}
        createButtonLabel="Create New Category"
        title="Categories Page"
        columns={categoriesColumns}
        dataKey="id"
        rows={data}
        loading={pending}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        handleChangePage={handleChangePage}
        handleFilter={handleFilter}
        currentPage={page}
        totalPage={total}
      />
    </>
  );
};

export default CategoriesScreen;
