import Modal from "@/components/Modal";
import { TFilterLocationDialogFC } from "./index.type";

const FilterLocationDialog: TFilterLocationDialogFC = ({ onClose }) => {
  return (
    <Modal title="Filter Locations" opened handleClose={onClose} size="xl">
      <p>This Table Dont Have Any Filter Right Now</p>
    </Modal>
  );
};

export default FilterLocationDialog;
