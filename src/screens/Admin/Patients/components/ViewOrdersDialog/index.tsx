import Modal from "@/components/Modal";
import { TViewOrdersDialogFC } from "./index.type";

const ViewOrdersDialog: TViewOrdersDialogFC = ({ selectedPatient }) => {
  return (
    <Modal size="xl" title="Orders" opened>
      <p>This Section Must Include Orders Table</p>
    </Modal>
  );
};

export default ViewOrdersDialog;
