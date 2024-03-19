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
import Button from "@/components/Button";
import { errorNotify, successNotify } from "@/utils/notify";
import { getDegreeOfEducationEnum, getGendersEnumSelection } from "@/utils/getEnumTransformer";

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
      errorNotify("باید تصویر پروفایل پزشک را انتخاب کنید");
      return;
    }
    const uploadedFile = await handleUploadProfile();
    if (!uploadedFile) {
      errorNotify("آپلود تصویر پروفایل با شکست مواجعه شد");
      return;
    }

    try {
      const res = await createTherapistAction({
        ...data,
        image: uploadedFile?.filePath!,
        gender: data.gender ? EGender.female : EGender.male,
        degreeOfEducation: data.degreeOfEducation as EDegtreeOfEducation,
      });
      if (res) successNotify("عملیات ساخت پزشک با موفقیت انجام گردید");
      else throw new Error();
    } catch (error) {
      errorNotify("عملیات ساخت پزشک با شکست مواجعه شد");
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
        errorNotify("عملیات ساخت پزشک با شکست مواجعه شد");
        return;
      } else {
        reqBody.image = uploadedFile?.filePath;
      }
    }
    try {
      const res = await editTherapistAction(selectedTherapist?.id!, reqBody as ICreateOrEditTherapistReqBody);
      if (res) successNotify("عملیات ویرایش پزشک با موفقیت اانچام گردید");
      else throw new Error();
    } catch (error) {
      errorNotify("عملیات ویرایش پزشک با شکست مواجعه شد");
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

  const modalTitle = selectedTherapist ? "ویرایش پزشک" : "ساخت پزشک جدید";

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
            <TextInput label="نام پزشک" name="firstName" control={control} />
          </Grid>
          <Grid item lg={6}>
            <TextInput label="نام خانوادگی پزشک" name="lastName" control={control} />
          </Grid>
          <Grid item lg={6}>
            <TextInput label="شماره تماس 1" name="phone" control={control} />
          </Grid>
          <Grid item lg={6}>
            <TextInput label="شماره تماس 2" name="phone2" control={control} />
          </Grid>
          <Grid item lg={6}>
            <Select
              control={control}
              name="degreeOfEducation"
              id="degree-of-education"
              label="مدرک تحصیلی پزشک"
              options={Object.entries(EDegtreeOfEducation).map(([key, value]) => ({
                key: getDegreeOfEducationEnum(key as EDegtreeOfEducation),
                value,
              }))}
              defaultValue={selectedTherapist?.degreeOfEducation || ""}
            />
          </Grid>
          <Grid item lg={6}>
            <Select
              control={control}
              name="workingFields"
              id="working-fields-label"
              label="زمینه های تخصصی پزشک"
              options={categories.map((category) => ({ key: category.faName, value: category.id }))}
              defaultValue={selectedTherapist?.workingFields ? selectedTherapist?.workingFields?.map((e) => e.id) : []}
              disabled={categoriesLoading}
              multiple
            />
          </Grid>
          <Grid item lg={12}>
            <Select control={control} name="gender" id="genders-label" label="جنسیت پزشک" options={getGendersEnumSelection()} />
          </Grid>
          <Grid item lg={12}>
            <TextInput rows={4} label="آدرس خونه پزشک" name="address" control={control} multiline />
          </Grid>
          <Grid item lg={12}>
            <TextInput rows={4} label="بیوگرافی" name="bio" control={control} multiline />
          </Grid>
          <Grid item lg={3}>
            <Button type="submit" loading={createOrEditLoading} loadingSpinnerSize="30px" fullWidth>
              {modalTitle}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateOrEditTherapistDialog;
