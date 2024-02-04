import Modal from "@/components/Modal";
import { TCreateScheduleFormFC, TCreateScheduleFormValidation } from "./index.type";
import { Grid } from "@mui/material";
import DayPicker from "@/components/DayPicker";
import { useForm } from "react-hook-form";
import useLocations from "@/hooks/api/useLocations";
import Select from "@/components/Select";
import TimePicker from "@/components/TimePicker";
import TextInput from "@/components/TextInput";
import RadioGroup from "@/components/RadioGroup";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createScheduleFormValidation } from "./index.constant";
import { isEmpty } from "@/utils/isEmpty";
import { useTransition } from "react";
import { addOwnNewScheduleAction } from "@/app/(therapist)/therapist/schedules/actions";
import { ETherapistScheduleType, TAddNewOwnScheduleReqBody } from "@/types/therapist.model";
import moment from "moment";
import { errorNotify, successNotify } from "@/utils/notify";
import { removeDuplicatedSelectKey } from "@/utils/selectOptions";

const CreateScheduleForm: TCreateScheduleFormFC = ({ handleClose }) => {
  const { locations, locationsLoading } = useLocations(10000);
  const [loading, handleTransition] = useTransition();
  const { control, handleSubmit, setError } = useForm<TCreateScheduleFormValidation>({
    resolver: zodResolver(createScheduleFormValidation),
  });
  const onSubmit = handleSubmit((data) => {
    if (isEmpty(data.startTime) || isEmpty(data.endTime)) {
      if (isEmpty(data.startTime)) setError("startTime", { message: "Enter Your Start Time" });
      if (isEmpty(data.endTime)) setError("endTime", { message: "Enter Your End Time" });
      return;
    }

    handleTransition(async () => {
      const reqBody: TAddNewOwnScheduleReqBody = {
        ...data,
        startTime: moment(data.startTime).format("HH:mm"),
        endTime: moment(data.endTime).format("HH:mm"),
        type: data.type as any,
      };
      const res = await addOwnNewScheduleAction(reqBody);
      if (res) successNotify("Schedule Added Successfully ...");
      else errorNotify("Unable To Add Schedule");
      handleClose();
    });
  });

  const LOCATIONS_OPTIONS = removeDuplicatedSelectKey(
    locations.map((location) => ({ key: `${location.city} ${location.address}`, value: location.id }))
  );

  const ORDER_SCHEDULE_TYPE_OPTIONS = Object.entries(ETherapistScheduleType).map(([key, value]) => ({ key, value }));

  return (
    <Modal handleClose={handleClose} title="Create New Schedule" opened size="md">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <DayPicker control={control} label="Day" name="day" />
          </Grid>
          <Grid item md={6}>
            <TextInput type="number" control={control} label="Room Number" name="room" />
          </Grid>
          <Grid item md={6}>
            <Select control={control} label="Location" name="location" options={LOCATIONS_OPTIONS} disabled={locationsLoading} id="location-select" />
          </Grid>
          <Grid item md={6}>
            <TimePicker control={control} label="Start Time" name="startTime" />
          </Grid>
          <Grid item md={6}>
            <TimePicker control={control} label="End Time" name="endTime" />
          </Grid>
          <Grid item md={12}>
            <RadioGroup
              control={control}
              id="schedule-type-label"
              label="Select Your Schedule Type"
              name="type"
              radios={ORDER_SCHEDULE_TYPE_OPTIONS}
            />
          </Grid>
          <Grid item md={12}>
            <Button loadingSpinnerSize="1.2rem" loading={loading || locationsLoading} type="submit" size="large" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateScheduleForm;
