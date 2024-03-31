"use client";

import { Grid, Typography } from "@mui/material";
import { TLoginFormValidation, TLoginScreenFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import { Key, Phone, VerifiedUser } from "@mui/icons-material";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormValidation } from "./index.constant";
import { loginAction } from "@/app/(auth)/auth/login/actions";
import { errorNotify, successNotify } from "@/core/notification";

const LoginScreen: TLoginScreenFC = () => {
  const { control, handleSubmit } = useForm<TLoginFormValidation>({ resolver: zodResolver(loginFormValidation) });
  const [pending, handleTransition] = useTransition();
  const route = useRouter();

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const isOk = await loginAction(data);
      if (isOk) {
        successNotify("ورود به حساب کاربری با موفقیت انجام شد");
        route.push("/");
      } else errorNotify("عملیات ورود به حساب کاربری با شکست انجام شد");
    });
  });

  return (
    <>
      <FlexBox gap={1}>
        <VerifiedUser fontSize="large" />
        <Typography fontWeight="bold" variant="h5" component="h1">
          ورود به پنل ادمین دکتر آنلاین
        </Typography>
      </FlexBox>
      <form onSubmit={onSubmit} style={{ width: "100%", marginTop: "40px" }}>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <TextInput helperText="شما باید شماره تماس خود را وارد کنید" control={control} label="شماره تماس" name="phone" icon={<Phone />} />
          </Grid>
          <Grid item md={12}>
            <TextInput
              type="password"
              helperText="گذرواژه شما باید 8 حرف داشته باشد"
              control={control}
              label="گذرواژه"
              name="password"
              icon={<Key />}
            />
          </Grid>
          <Grid item md={12}>
            <Button loadingSpinnerSize="1.5rem" loading={pending} type="submit" size="large" fullWidth>
              ورود به حساب
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginScreen;
