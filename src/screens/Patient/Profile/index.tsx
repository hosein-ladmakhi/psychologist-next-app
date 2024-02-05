"use client";

import { Box, Grid, Typography } from "@mui/material";
import { TProfileFormValidation, TProfileScreenFC } from "./index.type";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormValidation } from "./index.constant";
import { IPasswordUpdateReqBody } from "@/types/auth.model";
import { useTransition } from "react";
import { updatePasswordAction, updateProfileAction } from "@/app/(patient)/patient/profile/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const ProfileScreen: TProfileScreenFC = ({ user }) => {
  const [loading, handleTransition] = useTransition();
  const { control, handleSubmit } = useForm<TProfileFormValidation>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    },
    resolver: zodResolver(profileFormValidation),
  });

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const { password, currentPassword, ...profileReqBody } = data;
      if (password) {
        const reqBody: IPasswordUpdateReqBody = {
          password,
          currentPassword: currentPassword!,
        };
        const res = await updatePasswordAction(reqBody);
        if (res?.success) successNotify("Password Updated ...");
        else {
          errorNotify(res?.message || "Unable To Update Password");
          return;
        }
      }
      const res = await updateProfileAction(profileReqBody);
      if (res) successNotify("Profile Updated ...");
      else errorNotify("Unable To Update Profile");
    });
  });

  return (
    <>
      <Typography variant="h6" component="h1">
        You Can Modify Your Profile Account
      </Typography>

      <Box onSubmit={onSubmit} my={6} component="form">
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextInput label="First Name" name="firstName" control={control} type="text" />
          </Grid>
          <Grid item md={6}>
            <TextInput label="Last Name" name="lastName" control={control} type="text" />
          </Grid>
          <Grid item md={12}>
            <TextInput label="Phone Number" name="phone" control={control} type="text" />
          </Grid>
          <Grid item md={6}>
            <TextInput label="Current Password" name="currentPassword" control={control} type="password" />
          </Grid>
          <Grid item md={6}>
            <TextInput label="New Password" name="password" control={control} type="password" />
          </Grid>
          <Grid item md={2}>
            <Box mt={1}>
              <Button loading={loading} loadingSpinnerSize="1rem" type="submit" fullWidth size="large">
                Submit Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileScreen;
