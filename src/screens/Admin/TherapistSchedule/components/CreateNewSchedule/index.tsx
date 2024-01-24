import Modal from "@/components/Modal";
import { TCreateNewScheduleFC } from "./index.type";
import { CREATE_NEW_SCHEDULE_SUBJECT } from "./index.constant";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TSelectOptions } from "@/types/base.model";
import { getLocations } from "@/services/location.service";
import Select from "@/components/Select";
import TimePicker from "@/components/TimePicker";

const CreateNewSchedule: TCreateNewScheduleFC = ({ day, dayText, therapist }) => {
  const [locationsOption, setLocationsOption] = useState<TSelectOptions[]>([]);
  const [locationsOptionLoading, setLocationsOptionLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocationsOptionLoading(true);
    getLocations({ limit: 100000 })
      .then((data) => {
        setLocationsOption(data.content.map((location) => ({ value: location.id, key: `${location.city} - ${location.address}` })));
      })
      .finally(() => {
        setLocationsOptionLoading(false);
      });
  }, []);

  const { control, setValue } = useForm();
  useEffect(() => {
    setValue("day", dayText);
    setValue("therapist", therapist?.firstName + " " + therapist?.lastName);
  }, [dayText, therapist?.id]);

  return (
    <Modal subject={CREATE_NEW_SCHEDULE_SUBJECT} title="Create Schedule">
      <form>
        <TextInput disabled name="day" control={control} label="Day" />
        <TextInput disabled name="therapist" control={control} label="Therapist" />
        <Select control={control} id="location-label" label="Location" name="location" options={locationsOption} disabled={locationsOptionLoading} />
        <TextInput name="room" control={control} label="Room" />
        <TimePicker label="Start Time" name="startTime" control={control} />
      </form>
    </Modal>
  );
};

export default CreateNewSchedule;
