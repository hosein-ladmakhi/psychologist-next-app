import { useTransition } from "react";
import { TCreateOrEditPatientDialogFC, TCreateOrEditPatientFormValidation } from "./index.type";
import { createNewPatientAction, editPatientAction } from "@/app/(admin)/admin/patients/actions";
import Modal from "@/components/Modal";
import { Box } from "@mui/material";
import TextInput from "@/components/TextInput";
import { useCreateOrEditPatientForm } from "./useForm";
import Button from "@/components/Button";
import { errorNotify, successNotify } from "@/utils/notify";

const CreateOrEditPatientDialog: TCreateOrEditPatientDialogFC = ({ onClose, selectedPatient }) => {
  const [pending, handleTransition] = useTransition();
  const { control, handleSubmit } = useCreateOrEditPatientForm(selectedPatient);

  const onCreatePatient = async (data: TCreateOrEditPatientFormValidation) => {
    const res = await createNewPatientAction(data);
    if (res) successNotify("بیمار مورد نظر با موفقیت ایجاد گردید");
    else errorNotify("عملیات افزودن بیمار با شکست مواجعه شد");
    onClose();
  };

  const onEditPatient = async (data: TCreateOrEditPatientFormValidation) => {
    const res = await editPatientAction(selectedPatient?.id!, data);
    if (res) successNotify("بیمار مورد نظر با موفقیت ویرایش شد");
    else errorNotify("عملیات ویرایش بیمار با شکست مواجعه شد");
    onClose();
  };

  const onCreateOrEditPatient = handleSubmit((data) => {
    handleTransition(() => {
      if (selectedPatient) onEditPatient(data);
      else onCreatePatient(data);
    });
  });

  const modalTitle = selectedPatient ? "ویرایش بیمار" : "ساخت بیمار جدید";

  return (
    <Modal title={modalTitle} size="lg" handleClose={onClose} opened>
      <form onSubmit={onCreateOrEditPatient}>
        <TextInput label="نام بیمار" name="firstName" control={control} />
        <TextInput label="نام خانوادگی بیمار" name="lastName" control={control} />
        <TextInput label="شماره تماس بیمار" name="phone" control={control} />
        <Box mt={4}>
          <Button loadingSpinnerSize="1.5rem" type="submit" size="large" fullWidth loading={pending}>
            اعمال تغییرات
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditPatientDialog;
