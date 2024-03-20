import Modal from "@/components/Modal";
import { TFilterLocationDialogFC } from "./index.type";

const FilterLocationDialog: TFilterLocationDialogFC = ({ onClose }) => {
  return (
    <Modal title="جستجوی جدول" opened handleClose={onClose} size="xl">
      <p>در این ورژن این فیچر غیرفعال میباشد ...</p>
    </Modal>
  );
};

export default FilterLocationDialog;
