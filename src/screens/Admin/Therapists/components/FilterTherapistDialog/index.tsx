import Modal from "@/components/Modal";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { TFilterTherapistDialogFC, TFilterTherapistFormValidation } from "./index.type";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

const FilterTherapistDialog: TFilterTherapistDialogFC = ({ onClose, onChangeFilters }) => {
  const { handleSubmit, reset, control } = useForm<TFilterTherapistFormValidation>();
  const onSubmit = handleSubmit((data) => {
    onClose();
    onChangeFilters(data);
    reset();
  });

  return (
    <Modal size="sm" opened handleClose={onClose} title="فیلتر پزشکان">
      <form onSubmit={onSubmit}>
        <TextInput name="firstName" label="نام پزشک" control={control} />
        <TextInput name="lastName" label="نام خانوادگی پزشک" control={control} />
        <TextInput name="phone" label="شماره تلفن" control={control} />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            جستجو
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterTherapistDialog;
