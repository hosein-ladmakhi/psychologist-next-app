import { useRef, useTransition } from "react";
import { TCreateOrEditCategoryDialogFC, TCreateOrEditCategoryFormValidation } from "./index.type";
import { createNewCategoryAction, editCategoryAction } from "@/app/(admin)/admin/categories/actions";
import Modal from "@/components/Modal";
import { Box } from "@mui/material";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useCreateOrEditCategoryForm } from "./useForm";
import { errorNotify, successNotify } from "@/utils/notify";
import ImagePicker from "@/components/ImagePicker";
import { uploadCategoryIcon } from "@/services/category.service";

const CreateOrEditCategoryDialog: TCreateOrEditCategoryDialogFC = ({ onClose, selectedCategory }) => {
  const [pending, handleTransition] = useTransition();
  const { control, handleSubmit } = useCreateOrEditCategoryForm(selectedCategory);
  const iconRef = useRef<File>(null);

  const onCreateCategory = async (data: TCreateOrEditCategoryFormValidation) => {
    if (iconRef.current) {
      const formdata = new FormData();
      formdata.append("icon", iconRef.current);
      const res = await uploadCategoryIcon(formdata);
      if (res?.fileName) data.icon = res?.fileName;
    }
    const res = await createNewCategoryAction(data);
    if (res) successNotify("New Category Created Successfully ...");
    else errorNotify("Creating New Category Process has Failed ...");
    onClose();
  };

  const onEditCategory = async (data: TCreateOrEditCategoryFormValidation) => {
    if (iconRef.current) {
      const formdata = new FormData();
      formdata.append("icon", iconRef.current);
      const res = await uploadCategoryIcon(formdata);
      if (res?.fileName) data.icon = res?.fileName;
      else data.icon = selectedCategory?.icon;
    }
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
    <Modal title={modalTitle} size="lg" opened handleClose={onClose}>
      <ImagePicker height={100} width={100} ref={iconRef} />
      <form style={{ marginTop: "10px" }} onSubmit={onCreateOrEditCategory}>
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
