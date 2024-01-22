"use client";

import Table from "@/components/Table";
import { useState, useTransition } from "react";
import { categoriesColumns } from "./index.constant";
import { TCategoriesScreenFC } from "./index.type";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useStoreDispatch } from "@/hooks/useStoreDispatch";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { FILTER_CATEGORY_SUBJECT } from "./components/FilterCategoryDialog/index.constant";
import { TFilterCategoryFormValidation } from "./components/FilterCategoryDialog/index.type";
import { deleteCategoryAction } from "@/app/(admin)/admin/categories/actions";
import { ICategory } from "@/types/category.model";
import { UPSERT_CATEGORY_SUBJECT } from "./components/CreateOrEditCategoryDialog/index.constant";
import { errorNotify, successNotify } from "@/utils/notify";
import { useFilterDialogLoad } from "./useFilterDialogLoad";
import { useCreateOrEditDialogLoad } from "./useCreateOrEditDialogLoad";

const CategoriesScreen: TCategoriesScreenFC = ({ data, total, page }) => {
  const [pending, handleTransition] = useTransition();
  const dispatch = useStoreDispatch();
  const filterDialog = useFilterDialogLoad();
  const createOrEditDialog = useCreateOrEditDialogLoad();

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
    dispatch(openModal(FILTER_CATEGORY_SUBJECT));
    filterDialog.loadComponent();
  };

  const onCloseDialog = () => {
    dispatch(closeModal());
    setSelectedCategory(undefined);
    createOrEditDialog.unLoadComponent();
    filterDialog.unLoadComponent();
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
    dispatch(openModal(UPSERT_CATEGORY_SUBJECT));
    createOrEditDialog.loadComponent();
  };

  const handleEdit = (data: any) => {
    setSelectedCategory(data);
    dispatch(openModal(UPSERT_CATEGORY_SUBJECT));
    createOrEditDialog.loadComponent();
  };

  return (
    <>
      {filterDialog.Component && <filterDialog.Component onChangeFilters={onChangeFilters} onClose={onCloseDialog} />}
      {createOrEditDialog.Component && <createOrEditDialog.Component onClose={onCloseDialog} selectedCategory={selectedCategory} />}
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
