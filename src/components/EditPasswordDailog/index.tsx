"use client";

import { useForm } from "react-hook-form";
import Modal from "../Modal";
import TextInput from "../TextInput";
import { Box } from "@mui/material";
import Button from "../Button";
import { TEditPasswordDialogFC, TEditPasswordFormValidation } from "./index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPasswordFormValidation } from "./index.constant";
import { useTransition } from "react";
import { updatePasswordAction } from "@/app/(auth)/auth/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const EditPasswordDialog: TEditPasswordDialogFC = ({ type, id, handleClose }) => {
  const {
    control,
    handleSubmit
  } = useForm<TEditPasswordFormValidation>({ resolver: zodResolver(editPasswordFormValidation) });
  const [pending, handleTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    handleTransition(() => {
      updatePasswordAction(id, { type, ...data })
        .then((res) => {
          console.log("result", res);
          if (res) {
            successNotify("گذرواژه با موفقیت ویرایش گردید");
          } else {
            errorNotify("عملیات ویرایش گذرواژه با شکست مواجعه شد");
          }
        })
        .catch(() => {
          errorNotify("عملیات ویرایش گذرواژه با شکست مواجعه شد");
        })
        .finally(() => {
          handleClose();
        });
    });
  });

  return (
    <Modal handleClose={handleClose} opened title="ویرایش گذرواژه" size="sm">
      <form onSubmit={onSubmit}>
        <TextInput control={control} name="currentPassword" label="گذرواژه فعلی" type="password" />
        <TextInput control={control} name="password" label="گذرواژه جدید" type="password" />
        <Box mt={3}>
          <Button type="submit" fullWidth loading={pending}>
            ثبت تغییرات
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default EditPasswordDialog;
