import Modal from "@/components/Modal";
import { FILTER_ORDER_DIALOG_SUBJECT, ORDERS_STATUS_OPTIONS } from "./index.constant";
import { IFilterOrderFormValidation, TFilterOrderDialogFC } from "./index.type";
import Select from "@/components/Select";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { Box } from "@mui/material";

const FilterOrderDialog: TFilterOrderDialogFC = ({ onClose, onChangeFilter }) => {
  const { control, handleSubmit } = useForm<IFilterOrderFormValidation>();

  const onSubmit = handleSubmit((data) => {
    onClose();
    onChangeFilter(data);
  });

  return (
    <Modal handleClose={onClose} size="sm" subject={FILTER_ORDER_DIALOG_SUBJECT} title="Filter Orders">
      <form onSubmit={onSubmit}>
        <Select name="status" control={control} id="order-status" options={ORDERS_STATUS_OPTIONS} label="Status Of Orders" />
        <Box mt={2}>
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterOrderDialog;
