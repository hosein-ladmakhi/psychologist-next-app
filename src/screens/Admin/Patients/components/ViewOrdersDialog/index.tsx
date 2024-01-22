import Modal from "@/components/Modal";
import { VIEW_ORDERS_DIALOG } from "./index.constant";
import { TViewOrdersDialogFC } from "./index.type";

const ViewOrdersDialog: TViewOrdersDialogFC = ({ selectedPatient }) => {
  return (
    <Modal size="xl" title="Orders" subject={VIEW_ORDERS_DIALOG}>
      <p>This Section Must Include Orders Table</p>
    </Modal>
  );
};

export default ViewOrdersDialog;
