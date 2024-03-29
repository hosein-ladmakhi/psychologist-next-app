"use client";

import Modal from "@/components/Modal";
import {
  TFilterAdminsDialogFC
} from "@/screens/Admin/Admins/components/FilterAdminsDialog/index.type";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import { TFilterAdminsFormValidation } from "@/screens/Admin/Therapists/components/FilterTherapistDialog/index.type";
import { useSearchParams } from "@/hooks/useSearchParams";

const FilterAdminsDialog: TFilterAdminsDialogFC = ({ handleClose }) => {
  const { control, handleSubmit } = useForm<TFilterAdminsFormValidation>();
  const searchParams = useSearchParams();

  const onSubmit = handleSubmit((data) => {
    searchParams.onChangeMultipleSearchParams({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      isActive: data.status ? data.status === "active" : undefined,
      page: 1
    });
    handleClose();
  });

  return (
    <Modal opened handleClose={handleClose} title={"جستجوی ادمین ها"}>
      <form onSubmit={onSubmit}>
        <TextInput control={control} name="firstName" label="نام ادمین" />
        <TextInput control={control} name="lastName" label="نام خانوادگی ادمین" />
        <TextInput control={control} name="phone" label="شماره تماس" />
        <Select name="status" control={control} label="وضعیت" id="is-active" options={[
          {
            key: "وضعیت را مشخص کنید",
            value: ""
          },
          {
            key: "فعال",
            value: "active"
          },
          {
            key: "غیرفعال",
            value: "deactive"
          }
        ]} />
        <Box mt={2}>
          <Button type="submit" fullWidth>اعمال فیلتر</Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterAdminsDialog;