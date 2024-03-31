import { useRef, useTransition } from "react";
import { TCreateOrEditCategoryDialogFC, TCreateOrEditCategoryFormValidation } from "./index.type";
import Modal from "@/components/Modal";
import { Box } from "@mui/material";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useCreateOrEditCategoryForm } from "./useForm";
import { errorNotify, successNotify } from "@/utils/notify";
import ImagePicker from "@/components/ImagePicker";
import { uploadCategoryIcon } from "@/services/category.service";
import { createNewCategoryAction, editCategoryAction } from "@/app/(admin)/categories/actions";
import FlexBox from "@/components/FlexBox";

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
    if (res) successNotify("عمیات ساخت زمینه تخصصی با موفقیت انجام گردید");
    else errorNotify("عملیات ساخت زمینه تخصصی با شکست مواجعه شد");
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
    if (res) successNotify("عملیات ویرایش زمینه تخصصی با موفقیت انجام گردید");
    else errorNotify("عملیات ویرایش زمینه تخصصی با شکست مواجعه شد");
    onClose();
  };

  const onCreateOrEditCategory = handleSubmit((data) => {
    handleTransition(() => {
      if (selectedCategory) onEditCategory(data);
      else onCreateCategory(data);
    });
  });

  const modalTitle = selectedCategory ? "ویزایش زمینه تخصصی" : "ساخت زمینه تخصصی جدید";

  return (
    <Modal title={modalTitle} size="md" opened handleClose={onClose}>
      <FlexBox mb={2}>
        <ImagePicker defaultSrc="https://o2osell.com/cat_img/default.png?1587036898" height={100} width={100} ref={iconRef} />
      </FlexBox>
      <form style={{ marginTop: "10px" }} onSubmit={onCreateOrEditCategory}>
        <TextInput name="faName" label="نام فارسی زمینه تخصصی" control={control} />
        <TextInput name="enName" label="نام اینگلیسی زمینه تخصصی" control={control} />
        <Box mt={4}>
          <Button loading={pending} loadingSpinnerSize="1.5rem" type="submit" size="large" fullWidth>
            اعمال تغییرات
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditCategoryDialog;
