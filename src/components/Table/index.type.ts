import { TAdditionalTableAction } from '@/types/base.model';
import { FC, ReactNode } from 'react';

export interface ITableColumn {
  width: number;
  name: string;
  label: string;
}

export interface ITableProps {
  columns: ITableColumn[];
  rows: Record<string, any>[];
  dataKey: string;
  title?: string;
  createButtonLabel?: string;
  handleDelete?: (data: Record<string, any>) => void;
  handleEdit?: (data: Record<string, any>) => void;
  handleFilter?: () => void;
  handleCreate?: () => void;
  currentPage?: number;
  handleChangePage?: (current: number) => void;
  totalPage?: number;
  deleteOkConfirmationBtnText?: string;
  deleteCancelConfirmationBtnText?: string;
  deleteConfirmationTitle?: string;
  deleteConfirmationDescription?: FC<any>;
  loading?: boolean;
  handleResetFilter?: () => void;
  additionalActions?: TAdditionalTableAction[];
}
