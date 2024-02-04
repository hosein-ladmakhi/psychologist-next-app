"use client";

import { Box, Grid, Link, Typography } from "@mui/material";
import { TSignupFormValidation, TSignupScreenFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import { Key, Person, Phone, VerifiedUser } from "@mui/icons-material";
import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormValidation } from "./index.constant";
import { useTransition } from "react";
import { signupAction } from "@/app/(auth)/auth/signup/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { useRouter } from "next/navigation";

const SignupScreen: TSignupScreenFC = () => {
  const { control, handleSubmit } = useForm<TSignupFormValidation>({ resolver: zodResolver(signupFormValidation) });
  const [pending, handleTransition] = useTransition();
  const route = useRouter();

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const token = await signupAction(data);
      if (token) {
        successNotify("Your Account Created Successfully ...");
        route.push("/");
      } else errorNotify("Your Account Unable To Create Try Again");
    });
  });

  return (
    <>
      <FlexBox gap={1}>
        <VerifiedUser fontSize="large" />
        <Typography fontWeight="bold" variant="h5" component="h1">
          Signup Psychologist Application
        </Typography>
      </FlexBox>
      <form onSubmit={onSubmit} style={{ width: "100%", marginTop: "40px" }}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <TextInput helperText="Enter Your First Name" control={control} label="First Name" name="firstName" icon={<Person />} />
          </Grid>
          <Grid item md={6}>
            <TextInput helperText="Enter Your Last Name" control={control} label="Last Name" name="lastName" icon={<Person />} />
          </Grid>
          <Grid item md={12}>
            <TextInput helperText="Your Must Fill Your Phone Number" control={control} label="Phone Number" name="phone" icon={<Phone />} />
          </Grid>
          <Grid item md={12}>
            <TextInput
              type="password"
              helperText="Your Password Must Be More Than 8 Character"
              control={control}
              label="Password"
              name="password"
              icon={<Key />}
            />
          </Grid>
          <Grid item md={12}>
            <RadioGroup
              control={control}
              label="What is your role to signup?"
              name="role"
              radios={[
                { key: "Therapist", value: "therapist" },
                { key: "Patient", value: "patient" },
              ]}
              id="role"
            />
          </Grid>
          <Grid item md={12}>
            <Button loading={pending} type="submit" size="large" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item md={12}>
            <Box mt={2}>
              <Link href="/auth/login" component={NextLink}>
                I Already Have An Account, Login Please
              </Link>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignupScreen;
