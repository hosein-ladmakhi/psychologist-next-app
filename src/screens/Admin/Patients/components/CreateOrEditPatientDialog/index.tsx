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
    if (res) successNotify("New Patient Created Successfully ...");
    else errorNotify("Creating New Patient Process has Failed ...");
    onClose();
  };

  const onEditPatient = async (data: TCreateOrEditPatientFormValidation) => {
    const res = await editPatientAction(selectedPatient?.id!, data);
    if (res) successNotify("Edit Patient Finished Successfully ...");
    else errorNotify("Edit Patient Process has Failed ...");
    onClose();
  };

  const onCreateOrEditPatient = handleSubmit((data) => {
    handleTransition(() => {
      if (selectedPatient) onEditPatient(data);
      else onCreatePatient(data);
    });
  });

  const modalTitle = selectedPatient ? "Edit Patient" : "Create New Patient";

  return (
    <Modal title={modalTitle} size="lg" handleClose={onClose} opened>
      <form onSubmit={onCreateOrEditPatient}>
        <TextInput label="First Name" name="firstName" control={control} />
        <TextInput label="Last Name" name="lastName" control={control} />
        <TextInput label="Phone Number" name="phone" control={control} />
        <Box mt={4}>
          <Button loadingSpinnerSize="1.5rem" type="submit" size="large" fullWidth loading={pending}>
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditPatientDialog;
