import Modal from "@/components/Modal";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TFilterCategoryDialogFC, TFilterCategoryFormValidation } from "./index.type";
import { FILTER_CATEGORY_SUBJECT } from "./index.constant";

const FilterCategoryDialog: TFilterCategoryDialogFC = ({ onClose, onChangeFilters }) => {
  const { register, handleSubmit } = useForm<TFilterCategoryFormValidation>();
  const onSubmit = handleSubmit((data) => {
    onClose();
    onChangeFilters(data);
  });

  return (
    <Modal size="sm" subject={FILTER_CATEGORY_SUBJECT} title="Filter Tables" handleClose={onClose}>
      <form onSubmit={onSubmit}>
        <TextField {...register("faName")} fullWidth margin="dense" label="Farsi Name" />
        <TextField {...register("enName")} fullWidth label="English Name" margin="dense" />

        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            Search
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterCategoryDialog;
