import Modal from "@/components/Modal";
import { FILTER_PATIENT_SUBJECT } from "./index.constant";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { TFilterPatientDialogFC, TFilterPatientFormValidation } from "./index.type";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

const FilterPatientDialog: TFilterPatientDialogFC = ({ onClose, onChangeFilters }) => {
  const { control, handleSubmit } = useForm<TFilterPatientFormValidation>();
  const onSubmit = handleSubmit((data) => {
    onClose();
    onChangeFilters(data);
  });

  return (
    <Modal size="sm" subject={FILTER_PATIENT_SUBJECT} title="Filter Tables">
      <form onSubmit={onSubmit}>
        <TextInput label="First Name" name="firstName" control={control} />
        <TextInput label="Last Name" name="lastName" control={control} />
        <TextInput label="Phone Number" name="phone" control={control} />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            Search
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterPatientDialog;
