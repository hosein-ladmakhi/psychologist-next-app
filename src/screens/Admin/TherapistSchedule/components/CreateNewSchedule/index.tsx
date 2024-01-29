import Modal from "@/components/Modal";
import { TCreateNewScheduleFC, TCreateNewScheduleFormValidation } from "./index.type";
import { SCHEDULE_TYPE_OPTIONS, createNewScheduleFormValidation } from "./index.constant";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { useEffect, useTransition } from "react";
import Select from "@/components/Select";
import TimePicker from "@/components/TimePicker";
import RadioGroup from "@/components/RadioGroup";
import Button from "@/components/Button";
import { Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { addNewScheduleAction } from "@/app/(admin)/admin/therapists/schedules/[therapistId]/[day]/actions";
import { IAddNewScheduleToTherapistReqBody } from "@/types/therapist.model";
import { errorNotify, successNotify } from "@/utils/notify";
import useLocations from "@/hooks/api/useLocations";

const CreateNewSchedule: TCreateNewScheduleFC = ({ day, dayText, therapist, onClose }) => {
  const [pending, handleTransition] = useTransition();
  const { control, setValue, handleSubmit, setError, reset } = useForm<TCreateNewScheduleFormValidation>({
    resolver: zodResolver(createNewScheduleFormValidation),
    criteriaMode: "all",
    mode: "all",
    reValidateMode: "onBlur",
  });
  const { locations, locationsLoading } = useLocations(100000);
  const locationsOption = locations.map((location) => ({ value: location.id, key: `${location.city} - ${location.address}` }));

  useEffect(() => {
    setValue("day", dayText);
    setValue("therapist", therapist?.firstName + " " + therapist?.lastName);
  }, [dayText, therapist?.id]);

  const onSubmit = handleSubmit((data) => {
    const isValidEndTime = typeof data.endTime === typeof undefined;
    const isValidStartTime = typeof data.startTime === typeof undefined;
    if (isValidEndTime || isValidStartTime) {
      isValidEndTime && setError("endTime", { message: "Enter Your End Time" });
      isValidStartTime && setError("startTime", { message: "Enter Your Start Time" });
      return;
    }

    handleTransition(async () => {
      const reqBody = {
        ...data,
        therapist: therapist?.id!,
        day: +day!,
        endTime: moment(data.endTime).format("HH:mm"),
        startTime: moment(data.startTime).format("HH:mm"),
      };
      const res = await addNewScheduleAction(reqBody as IAddNewScheduleToTherapistReqBody);
      if (res) successNotify("The Schedule Added Successfully");
      else errorNotify("The Adding New Schedule Process failed ...");
      onClose();
      reset();
    });
  });

  return (
    <Modal size="xl" opened title="Create Schedule">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextInput disabled name="day" control={control} label="Day" />
          </Grid>
          <Grid item md={6}>
            <TextInput disabled name="therapist" control={control} label="Therapist" />
          </Grid>
          <Grid item md={6}>
            <Select control={control} id="location-label" label="Location" name="location" options={locationsOption} disabled={locationsLoading} />
          </Grid>
          <Grid item md={6}>
            <TextInput name="room" control={control} label="Room" />
          </Grid>
          <Grid item md={6}>
            <TimePicker label="Start Time" name="startTime" control={control} />
          </Grid>
          <Grid item md={6}>
            <TimePicker label="End Time" name="endTime" control={control} />
          </Grid>
          <Grid item md={12}>
            <RadioGroup control={control} label="Select Your Schedule Type" id="schedule-label" name="type" radios={SCHEDULE_TYPE_OPTIONS} />
          </Grid>
          <Grid item md={12}>
            <Button loading={pending} type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateNewSchedule;
