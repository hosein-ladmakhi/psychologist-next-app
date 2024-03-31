import Modal from "@/components/Modal";
import { useTransition, type FC } from "react";
import { useForm } from "react-hook-form";
import { ICreateOrEditAdminDialogProps, TCreateOrEditAdminFormValidation } from "./index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrEditAdminFormValidation } from "./index.constant";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import { errorNotify, successNotify } from "@/core/notification";
import { createAdminAction, editAdminAction } from "@/app/(admin)/actions";
import { useSearchParams } from "@/hooks/useSearchParams";

const isActiveOptions = [
  {
    key: "وضعیت فعال",
    value: "true",
  },
  {
    key: "وضعیت غیرفعال",
    value: "false",
  },
];

const CreateOrEditAdminDialog: FC<ICreateOrEditAdminDialogProps> = ({ handleClose, isOpen, selectedAdmin }) => {
  const { control, handleSubmit } = useForm<TCreateOrEditAdminFormValidation>({
    resolver: zodResolver(createOrEditAdminFormValidation),
    defaultValues: {
      firstName: selectedAdmin?.firstName || "",
      lastName: selectedAdmin?.lastName || "",
      isActive: selectedAdmin?.isActive ? "true" : "false",
      phone: selectedAdmin?.phone || "",
      password: selectedAdmin?.password,
    },
  });

  const [pending, handleTransition] = useTransition();
  const searchParams = useSearchParams();

  const handleEditAdmin = (data: TCreateOrEditAdminFormValidation) => {
    handleTransition(() => {
      editAdminAction({ ...data, id: selectedAdmin!.id, isActive: data.isActive === "true" })
        .then((res) => {
          if (res) {
            successNotify("ویرایش ادمین با موفقیت ثبت گردید");
          } else {
            errorNotify("عملیات ویرایش ادمین با شکست مواجعه شد");
          }
        })
        .catch(() => {
          errorNotify("عملیات ویرایش ادمین با شکست مواجعه شد");
        })
        .finally(() => {
          handleClose();
        });
    });
  };

  const handleCreateAdmin = (data: TCreateOrEditAdminFormValidation) => {
    handleTransition(() => {
      createAdminAction({ ...data, isActive: data.isActive === "true" })
        .then((res) => {
          if (res) {
            successNotify("ادمین با موفقیت ثبت گردید");
            searchParams.onChangeSearchParams("page", 1);
          } else {
            errorNotify("عملیات ساختن ادمین با شکست مواجعه شد دوباره تلاش کنید");
          }
        })
        .catch(() => {
          errorNotify("عملیات ویرایش ادمین با شکست مواجعه شد");
        })
        .finally(() => {
          handleClose();
        });
    });
  };

  const onSubmit = handleSubmit((data) => {
    selectedAdmin ? handleEditAdmin(data) : handleCreateAdmin(data);
  });

  const modalTitle = selectedAdmin ? "ویرایش ادمین" : "ساخت ادمین جدید";

  return (
    <Modal title={modalTitle} handleClose={handleClose} opened={isOpen} size="sm">
      <form onSubmit={onSubmit}>
        <TextInput control={control} label="نام ادمین" name="firstName" helperText="نام ادمین خود را وارد کنید" type="text" />
        <TextInput control={control} label="نام خانوادگی ادمین" name="lastName" helperText="نام خانوادگی ادمین خود را وارد کنید" type="text" />
        <TextInput control={control} label="شماره تماس" name="phone" helperText="شماره تماس را وارد کنید" type="text" />
        {!selectedAdmin?.id && <TextInput control={control} label="گذرواژه" name="password" helperText="گذرواژه را وارد کنید" type="password" />}
        <Select control={control} id="isActive" label="وضعیت ادمین" name="isActive" options={isActiveOptions} />
        <Box mt={3}>
          <Button loading={pending} type="submit" fullWidth size="large">
            {modalTitle}
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditAdminDialog;
