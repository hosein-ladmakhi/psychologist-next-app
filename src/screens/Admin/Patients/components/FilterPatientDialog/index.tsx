import Modal from "@/components/Modal";
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
    <Modal size="sm" opened title="جستجوی جدول">
      <form onSubmit={onSubmit}>
        <TextInput label="نام بیمار" name="firstName" control={control} />
        <TextInput label="نام خانوادگی بیمار" name="lastName" control={control} />
        <TextInput label="شماره تماس بیمار" name="phone" control={control} />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            اعمال فیلتر
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterPatientDialog;
