"use client";

import { Grid, Typography } from "@mui/material";
import { TProfileFC } from "./index.type";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";

const ProfileScreen: TProfileFC = () => {
  const { control } = useForm();
  return (
    <>
      <Typography mb={4} variant="h5" component="h1">
        Edit Your Profile Account
      </Typography>
      <form>
        <Grid container spacing={2}>
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
            <Select control={control} label="Degree Of Education" name="degreeOfEducation" options={[]} id="degree-of-education" />
          </Grid>
          <Grid item lg={4}>
            <Select control={control} label="Gender" name="gender" options={[]} id="gender" />
          </Grid>
          <Grid item lg={4}>
            <Select control={control} label="Working Fields" name="workingFields" options={[]} id="working-fields" />
          </Grid>
          <Grid item lg={12}>
            <TextInput control={control} label="Home Address" name="address" multiline rows={6} />
          </Grid>
          <Grid item lg={12}>
            <TextInput control={control} label="Biography" name="bio" multiline rows={8} />
          </Grid>
          <Grid item lg={2}>
            <Button>Submit Changes</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProfileScreen;
