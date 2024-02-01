"use client";

import { Box, Grid, Link, Typography } from "@mui/material";
import { TLoginFormValidation, TLoginScreenFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import { Key, Phone, VerifiedUser } from "@mui/icons-material";
import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import NextLink from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormValidation } from "./index.constant";
import { loginAction } from "@/app/(auth)/auth/login/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const LoginScreen: TLoginScreenFC = () => {
  const { control, handleSubmit } = useForm<TLoginFormValidation>({ resolver: zodResolver(loginFormValidation) });
  const [pending, handleTransition] = useTransition();
  const route = useRouter();

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const isOk = await loginAction(data);
      if (isOk) {
        successNotify("Login Successfully ...");
        route.push("/");
      } else errorNotify("Unable To Login ....");
    });
  });

  return (
    <>
      <FlexBox gap={1}>
        <VerifiedUser fontSize="large" />
        <Typography fontWeight="bold" variant="h5" component="h1">
          Login Psychologist Application
        </Typography>
      </FlexBox>
      <form onSubmit={onSubmit} style={{ width: "100%", marginTop: "40px" }}>
        <Grid container spacing={1}>
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
            <Button loadingSpinnerSize="1.5rem" loading={pending} type="submit" size="large" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item md={12}>
            <Box mt={2}>
              <Link href="/auth/signup" component={NextLink}>
                I Want To Create New Account
              </Link>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginScreen;
