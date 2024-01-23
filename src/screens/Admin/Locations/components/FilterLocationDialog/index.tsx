import Modal from "@/components/Modal";
import { TFilterLocationDialogFC } from "./index.type";
import { FILTER_LOCATION_DIALOG_SUBJECT } from "./index.constant";

const FilterLocationDialog: TFilterLocationDialogFC = ({ onClose }) => {
  return (
    <Modal title="Filter Locations" subject={FILTER_LOCATION_DIALOG_SUBJECT} handleClose={onClose} size="xl">
      <p>This Table Dont Have Any Filter Right Now</p>
    </Modal>
  );
};

export default FilterLocationDialog;
