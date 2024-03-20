import Modal from "@/components/Modal";
import { TCreateOrEditLocationDialogFC, TCreateOrEditLocationFormValidation } from "./index.type";
import { useCreateOrEditLocationForm } from "./useForm";
import TextInput from "@/components/TextInput";
import { useTransition } from "react";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import { createLocationAction, editLocationAction } from "@/app/(admin)/admin/locations/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import useCities from "@/hooks/api/useCities";

const CreateOrEditLocationDialog: TCreateOrEditLocationDialogFC = ({ onClose, selectedLocation }) => {
  const { handleSubmit, control } = useCreateOrEditLocationForm(selectedLocation);
  const [pending, handleTransition] = useTransition();
  const { cities, citiesLoading } = useCities();
  const citiesOptions = cities.map((city) => ({ key: city.name, value: city.name }));

  const modalTitle = selectedLocation ? "ویرایش آدرس" : "ساخت آدرس جدید";

  const handleCreate = async (data: TCreateOrEditLocationFormValidation) => {
    const res = await createLocationAction(data);
    if (res) successNotify("ساخت آدرس با موفقیت انجام گردید");
    else errorNotify("عملیات افزودن آدرس جدید با شکست مواجعه شد");
  };

  const handleEdit = async (data: TCreateOrEditLocationFormValidation) => {
    const res = await editLocationAction(selectedLocation?.id!, data);
    if (res) successNotify("ویرایش آدرس با موفقیت انجام گردید");
    else errorNotify("عملیات ویرایش آدرس با شکست مواجعه شد");
  };

  const onSubmit = handleSubmit((data: TCreateOrEditLocationFormValidation) => {
    handleTransition(async () => {
      if (selectedLocation) await handleEdit(data);
      else await handleCreate(data);
      onClose();
    });
  });

  return (
    <Modal title={modalTitle} opened handleClose={onClose} size="md">
      <form onSubmit={onSubmit}>
        {citiesOptions && (
          <Select
            disabled={citiesLoading}
            control={control}
            id="cities-label"
            label="شهر"
            name="city"
            options={citiesOptions}
            defaultValue={selectedLocation?.city}
          />
        )}
        <TextInput control={control} label="آدرس محلی" name="address" multiline rows={5} />
        <Box mt={4}>
          <Button type="submit" loadingSpinnerSize="1.5rem" loading={pending} fullWidth>
            ذخیره سازی تغییرات
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditLocationDialog;
