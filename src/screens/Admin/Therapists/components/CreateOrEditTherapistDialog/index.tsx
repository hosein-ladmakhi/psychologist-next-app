import { useRef, useTransition } from "react";
import { TCreateOrEditTherapistDialogFC, TCreateOrEditTherapistFormValidation } from "./index.type";
import Modal from "@/components/Modal";
import ImagePicker from "@/components/ImagePicker";
import { Box, Grid } from "@mui/material";
import { EDegtreeOfEducation, EGender, ICreateOrEditTherapistReqBody } from "@/types/therapist.model";
import { uploadTherapistProfile } from "@/services/therapist.service";
import { createTherapistAction, editTherapistAction } from "@/app/(admin)/admin/therapists/actions";
import { API_URL } from "@/constants";
import { useCategories } from "@/hooks/api/useCategories";
import { useCreateOrEditTherapistForm } from "./useForm";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/Button";
import { errorNotify, successNotify } from "@/utils/notify";

const CreateOrEditTherapistDialog: TCreateOrEditTherapistDialogFC = ({ onClose, selectedTherapist }) => {
  const { categories, categoriesLoading } = useCategories();
  const [createOrEditLoading, handleCreateOrEditTransition] = useTransition();
  const imageRef = useRef<File>(null);
  const { handleSubmit, control } = useCreateOrEditTherapistForm(selectedTherapist);

  const handleUploadProfile = () => {
    const formdata = new FormData();
    formdata.append("image", imageRef?.current as any);
    return uploadTherapistProfile(formdata);
  };

  const handleCreate = async (data: TCreateOrEditTherapistFormValidation) => {
    if (!imageRef?.current) {
      errorNotify("You Must Select Your Profile Image");
      return;
    }
    const uploadedFile = await handleUploadProfile();
    if (!uploadedFile) {
      errorNotify("Your Profile Image Not Uploaded Try Again");
      return;
    }

    try {
      const res = await createTherapistAction({
        ...data,
        image: uploadedFile?.filePath!,
        gender: data.gender ? EGender.female : EGender.male,
        degreeOfEducation: data.degreeOfEducation as EDegtreeOfEducation,
      });
      if (res) successNotify("Therapist Created ...");
      else throw new Error();
    } catch (error) {
      errorNotify("Therapist Not Created ...");
    } finally {
      onClose();
    }
  };

  const handleEdit = async (data: TCreateOrEditTherapistFormValidation) => {
    const reqBody: Partial<ICreateOrEditTherapistReqBody> = {
      ...data,
      gender: data.gender ? EGender.female : EGender.male,
      degreeOfEducation: data.degreeOfEducation as EDegtreeOfEducation,
    };
    if (imageRef?.current) {
      const uploadedFile = await handleUploadProfile();
      if (!uploadedFile) {
        errorNotify("Your Profile Image Not Uploaded Try Again");
        return;
      } else {
        reqBody.image = uploadedFile?.filePath;
      }
    }
    try {
      const res = await editTherapistAction(selectedTherapist?.id!, reqBody as ICreateOrEditTherapistReqBody);
      if (res) successNotify("Therapist Updated ...");
      else throw new Error();
    } catch (error) {
      errorNotify("Therapist Not Updated ...");
    } finally {
      onClose();
    }
  };

  const onSubmit = handleSubmit((data) => {
    handleCreateOrEditTransition(async () => {
      if (selectedTherapist) {
        handleEdit(data);
      } else {
        handleCreate(data);
      }
    });
  });

  const modalTitle = selectedTherapist ? "Edit Therapist" : "Create New Therapist";

  return (
    <Modal opened handleClose={onClose} title={modalTitle} size="xl">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Box component="center">
              <ImagePicker
                defaultSrc={selectedTherapist?.image ? `${API_URL}${selectedTherapist?.image}` : undefined}
                ref={imageRef}
                height={100}
                width={100}
              />
            </Box>
          </Grid>
          <Grid item lg={6}>
            <TextInput label="First Name" name="firstName" control={control} />
          </Grid>
          <Grid item lg={6}>
            <TextInput label="Last Name" name="lastName" control={control} />
          </Grid>
          <Grid item lg={6}>
            <TextInput label="Phone Number 1" name="phone" control={control} />
          </Grid>
          <Grid item lg={6}>
            <TextInput label="Phone Number 2" name="phone2" control={control} />
          </Grid>
          <Grid item lg={6}>
            <Select
              control={control}
              name="degreeOfEducation"
              id="degree-of-education"
              label="Degree Of Education"
              options={Object.entries(EDegtreeOfEducation).map(([key, value]) => ({ key, value }))}
              defaultValue={selectedTherapist?.degreeOfEducation || ""}
            />
          </Grid>
          <Grid item lg={6}>
            <Select
              control={control}
              name="workingFields"
              id="working-fields-label"
              label="Working Fields"
              options={categories.map((category) => ({ key: category.enName, value: category.id }))}
              defaultValue={selectedTherapist?.workingFields ? selectedTherapist?.workingFields?.map((e) => e.id) : []}
              disabled={categoriesLoading}
              multiple
            />
          </Grid>
          <Grid item lg={12}>
            <TextInput rows={4} label="Home Address" name="address" control={control} multiline />
          </Grid>
          <Grid item lg={12}>
            <TextInput rows={4} label="Bio" name="bio" control={control} multiline />
          </Grid>
          <Grid item lg={12}>
            <CheckBox control={control} name="gender" label="Are You Female ?" defaultChecked />
          </Grid>
          <Grid item lg={3}>
            <Button type="submit" loading={createOrEditLoading} loadingSpinnerSize="30px" fullWidth>
              Save This Therapist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateOrEditTherapistDialog;
