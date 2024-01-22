import { useTransition } from "react";
import { TCreateOrEditCategoryDialogFC, TCreateOrEditCategoryFormValidation } from "./index.type";
import { UPSERT_CATEGORY_SUBJECT } from "./index.constant";
import { createNewCategoryAction, editCategoryAction } from "@/app/(admin)/admin/categories/actions";
import Modal from "@/components/Modal";
import { Box } from "@mui/material";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useCreateOrEditCategoryForm } from "./useForm";
import { errorNotify, successNotify } from "@/utils/notify";

const CreateOrEditCategoryDialog: TCreateOrEditCategoryDialogFC = ({ onClose, selectedCategory }) => {
  const [pending, handleTransition] = useTransition();
  const { control, handleSubmit } = useCreateOrEditCategoryForm(selectedCategory);

  const onCreateCategory = async (data: TCreateOrEditCategoryFormValidation) => {
    const res = await createNewCategoryAction(data);
    if (res) successNotify("New Category Created Successfully ...");
    else errorNotify("Creating New Category Process has Failed ...");
    onClose();
  };

  const onEditCategory = async (data: TCreateOrEditCategoryFormValidation) => {
    const res = await editCategoryAction(selectedCategory?.id!, data);
    if (res) successNotify("Edit Category Finished Successfully ...");
    else errorNotify("Edit Category Process has Failed ...");
    onClose();
  };

  const onCreateOrEditCategory = handleSubmit((data) => {
    handleTransition(() => {
      if (selectedCategory) onEditCategory(data);
      else onCreateCategory(data);
    });
  });

  const modalTitle = selectedCategory ? "Edit Category" : "Create New Category";

  return (
    <Modal title={modalTitle} size="lg" subject={UPSERT_CATEGORY_SUBJECT} handleClose={onClose}>
      <form onSubmit={onCreateOrEditCategory}>
        <TextInput name="faName" label="Farsi Name" control={control} />
        <TextInput name="enName" label="English Name" control={control} />
        <Box mt={4}>
          <Button loading={pending} loadingSpinnerSize="1.5rem" type="submit" size="large" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditCategoryDialog;
