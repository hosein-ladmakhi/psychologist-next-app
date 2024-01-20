import Modal from '@/components/Modal';
import { FC } from 'react';
import { VIEW_ORDERS_DIALOG } from './index.constant';
import { ViewOrdersDialogProps } from './index.type';
import { ITableColumn } from '@/components/Table/index.type';

const ViewOrdersDialog: FC<ViewOrdersDialogProps> = ({ selectedPatient }) => {
  return (
    <Modal size="xl" title="Orders" subject={VIEW_ORDERS_DIALOG}>
      <p>This Section Must Include Orders Table</p>
    </Modal>
  );
};

export default ViewOrdersDialog;
