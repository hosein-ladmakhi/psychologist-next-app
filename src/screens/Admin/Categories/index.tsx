'use client';

import Table from '@/components/Table';
import { FC, useState, useTransition } from 'react';
import { categoriesColumns } from './index.constant';
import { ICategoriesScreenProps } from './index.type';
import { useSearchParams } from '@/hooks/useSearchParams';
import FilterCategoryDialog from './components/FilterCategoryDialog';
import { useStoreDispatch } from '@/hooks/useStoreDispatch';
import { closeModal, openModal } from '@/store/slices/modalSlices';
import { FILTER_CATEGORY_SUBJECT } from './components/FilterCategoryDialog/index.constant';
import { TFilterCategoryFormValidation } from './components/FilterCategoryDialog/index.type';
import toast from 'react-hot-toast';
import { deleteCategoryAction } from '@/app/(admin)/admin/categories/actions';
import CreateOrEditCategoryDialog from './components/CreateOrEditCategoryDialog';
import { ICategory } from '@/types/category.model';
import { UPSERT_CATEGORY_SUBJECT } from './components/CreateOrEditCategoryDialog/index.constant';

const CategoriesScreen: FC<ICategoriesScreenProps> = ({
  data,
  total,
  page,
}) => {
  const [pending, handleTransition] = useTransition();
  const dispatch = useStoreDispatch();
  const { onChangeSearchParams, onChangeMultipleSearchParams } =
    useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({
      faName: undefined,
      enName: undefined,
      page: 1,
    });
  };

  const handleChangePage = (page: number) => {
    onChangeSearchParams('page', page.toString());
  };

  const handleFilter = () => {
    dispatch(openModal(FILTER_CATEGORY_SUBJECT));
  };

  const onCloseFilterCategoryDialog = () => {
    dispatch(closeModal());
  };

  const handleDelete = (category: Record<string, any>) => {
    handleTransition(() => {
      deleteCategoryAction(category.id).then((res) => {
        if (res)
          toast.success(`The ${category.enName} has deleted successfully ...`);
        else toast.error('The category not deleted, try again');
      });
    });
  };

  const onChangeFilters = (data: TFilterCategoryFormValidation) => {
    onChangeMultipleSearchParams({ ...data, page: 1 });
  };

  const onCloseCreateOrEditCategoryDialog = () => {
    dispatch(closeModal());
  };

  const handleCreate = () => {
    dispatch(openModal(UPSERT_CATEGORY_SUBJECT));
  };

  const handleEdit = (data: any) => {
    setSelectedCategory(data);
    dispatch(openModal(UPSERT_CATEGORY_SUBJECT));
  };

  return (
    <>
      <FilterCategoryDialog
        onChangeFilters={onChangeFilters}
        onClose={onCloseFilterCategoryDialog}
      />
      <CreateOrEditCategoryDialog
        onClose={onCloseCreateOrEditCategoryDialog}
        selectedCategory={selectedCategory}
      />
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
