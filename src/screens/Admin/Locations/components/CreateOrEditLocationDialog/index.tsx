import Modal from "@/components/Modal";
import { TCreateOrEditLocationDialogFC, TCreateOrEditLocationFormValidation } from "./index.type";
import { UPSERT_LOCATION_DIALOG_SUBJECT } from "./index.constant";
import { useCreateOrEditLocationForm } from "./useForm";
import TextInput from "@/components/TextInput";
import { useEffect, useState, useTransition } from "react";
import { ICity } from "@/types/location.model";
import Select from "@/components/Select";
import { TSelectOptions } from "@/types/base.model";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import { createLocationAction, editLocationAction } from "@/app/(admin)/admin/locations/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const CreateOrEditLocationDialog: TCreateOrEditLocationDialogFC = ({ onClose, selectedLocation }) => {
  const { handleSubmit, control } = useCreateOrEditLocationForm(selectedLocation);
  const [pending, handleTransition] = useTransition();
  const [citiesOptions, setCitiesOptions] = useState<TSelectOptions[]>([]);
  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((cities: ICity[]) => {
        setCitiesOptions(cities.map((city) => ({ key: city.slug, value: city.slug })));
      });
  }, []);

  const modalTitle = selectedLocation ? "Edit Location" : "Create New Location";

  const handleCreate = async (data: TCreateOrEditLocationFormValidation) => {
    const res = await createLocationAction(data);
    if (res) successNotify("Create Location Successfully ...");
    else errorNotify("Create Location Failed ...");
  };

  const handleEdit = async (data: TCreateOrEditLocationFormValidation) => {
    const res = await editLocationAction(selectedLocation?.id!, data);
    if (res) successNotify("Edit Location Successfully ...");
    else errorNotify("Edit Location Failed ...");
  };

  const onSubmit = handleSubmit((data: TCreateOrEditLocationFormValidation) => {
    handleTransition(async () => {
      if (selectedLocation) await handleEdit(data);
      else await handleCreate(data);
      onClose();
    });
  });

  return (
    <Modal title={modalTitle} subject={UPSERT_LOCATION_DIALOG_SUBJECT} handleClose={onClose} size="md">
      <form onSubmit={onSubmit}>
        {citiesOptions && (
          <Select control={control} id="cities-label" label="City" name="city" options={citiesOptions} defaultValue={selectedLocation?.city} />
        )}
        <TextInput control={control} label="Address" name="address" multiline rows={5} />
        <Box mt={4}>
          <Button type="submit" loadingSpinnerSize="1.5rem" loading={pending} fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditLocationDialog;
