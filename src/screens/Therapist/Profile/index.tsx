"use client";

import { Grid, Typography } from "@mui/material";
import { TProfileFC } from "./index.type";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useCategories } from "@/hooks/api/useCategories";
import { useRef, useTransition } from "react";
import { updateOwnTherapistProfileAction } from "@/app/(therapist)/therapist/profile/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import ImagePicker from "@/components/ImagePicker";
import { API_URL } from "@/constants";
import { uploadTherapistProfile } from "@/services/therapist.service";
import { useProfileForm } from "./useForm";
import { categoriesSelects, degreeOfEducationSelects, genderSelects } from "@/utils/select-options";

const ProfileScreen: TProfileFC = ({ user }) => {
  const imageRef = useRef<File | null>(null);
  const [loading, handleTransition] = useTransition();
  const { control, handleSubmit } = useProfileForm(user);

  const { categories, categoriesLoading } = useCategories();

  const DEGREE_OF_EDUCATION_OPTIONS = degreeOfEducationSelects();
  const GENDER_OPTIONS = genderSelects();
  const CATEGORIES_OPTIONS = categoriesSelects(categories);

  const handleUploadNewProfile = () => {
    const formdata = new FormData();
    formdata.append("image", imageRef.current as any);
    return uploadTherapistProfile(formdata);
  };

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      if (imageRef.current) {
        const uploadedFile = await handleUploadNewProfile();
        if (uploadedFile?.filePath) {
          data.image = uploadedFile.filePath;
        }
      }
      const res = await updateOwnTherapistProfileAction(data);
      if (res) successNotify("Your Profile Updated ...");
      else errorNotify("Your Profile Unable To Update");
    });
  });

  return (
    <>
      <Typography mb={4} variant="h5" component="h1">
        Edit Your Profile Account
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <ImagePicker height={120} width={120} defaultSrc={`${API_URL}${user.image}`} ref={imageRef} />
          </Grid>
          <Grid item lg={4}>
            <TextInput control={control} label="First Name" name="firstName" />
          </Grid>
          <Grid item lg={4}>
            <TextInput control={control} label="Last Name" name="lastName" />
          </Grid>
          <Grid item lg={4}>
            <TextInput control={control} label="Phone Number 1" name="phone" />
          </Grid>
          <Grid item lg={4}>
            <TextInput control={control} label="Phone Number 2" name="phone2" />
          </Grid>
          <Grid item lg={4}>
            <Select
              control={control}
              label="Degree Of Education"
              name="degreeOfEducation"
              options={DEGREE_OF_EDUCATION_OPTIONS}
              id="degree-of-education"
            />
          </Grid>
          <Grid item lg={4}>
            <Select control={control} label="Gender" name="gender" options={GENDER_OPTIONS} id="gender" />
          </Grid>
          <Grid item lg={4}>
            <Select
              control={control}
              label="Working Fields"
              disabled={categoriesLoading}
              name="workingFields"
              options={CATEGORIES_OPTIONS}
              id="working-fields"
              multiple
            />
          </Grid>
          <Grid item lg={12}>
            <TextInput control={control} label="Home Address" name="address" multiline rows={6} />
          </Grid>
          <Grid item lg={12}>
            <TextInput control={control} label="Biography" name="bio" multiline rows={8} />
          </Grid>
          <Grid item lg={2}>
            <Button type="submit" loading={loading}>
              Submit Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProfileScreen;
