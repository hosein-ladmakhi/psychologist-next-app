import Modal from "@/components/Modal";
import { FILTER_THERAPIST_SUBJECT } from "./index.constant";
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
    <Modal size="sm" subject={FILTER_THERAPIST_SUBJECT} handleClose={onClose} title="Filter Tables">
      <form onSubmit={onSubmit}>
        <TextInput name="firstName" label="First Name" control={control} />
        <TextInput name="lastName" label="Last Name" control={control} />
        <TextInput name="phone" label="Phone Number" control={control} />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            Search
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterTherapistDialog;
