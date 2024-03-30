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
import moment from "moment-jalaali";
import { IAddNewScheduleToTherapistReqBody } from "@/types/therapist.model";
import { errorNotify, successNotify } from "@/utils/notify";
import useLocations from "@/hooks/api/useLocations";
import { addNewScheduleAction } from "@/app/(admin)/therapists/schedules/[therapistId]/[day]/actions";

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
      if (res) successNotify("آیتم رزرو با موفقیت به چارت رزروی اضافه شد");
      else errorNotify("عملیات افزودن رزرو با شکست مواجعه شد");
      onClose();
      reset();
    });
  });

  return (
    <Modal handleClose={onClose} size="xl" opened title="فرم افزودن آیتم جدید به چارت رزرو">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextInput disabled name="day" control={control} label="روز هفته" />
          </Grid>
          <Grid item md={6}>
            <TextInput disabled name="therapist" control={control} label="پزشک" />
          </Grid>
          <Grid item md={6}>
            <Select
              control={control}
              id="location-label"
              label="آدرس محل برگزاری"
              name="location"
              options={locationsOption}
              disabled={locationsLoading}
            />
          </Grid>
          <Grid item md={6}>
            <TextInput name="room" control={control} label="اتاق" />
          </Grid>
          <Grid item md={6}>
            <TimePicker label="ساعت شروع" name="startTime" control={control} />
          </Grid>
          <Grid item md={6}>
            <TimePicker label="ساعت پایان" name="endTime" control={control} />
          </Grid>
          <Grid item md={12}>
            <RadioGroup
              control={control}
              label="نحوه برگزاری جلسه رزرو را انتخاب کنید"
              id="schedule-label"
              name="type"
              radios={SCHEDULE_TYPE_OPTIONS}
            />
          </Grid>
          <Grid item md={12}>
            <Button size="large" loading={pending} type="submit" fullWidth>
              ساخت آیتم رزرو
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateNewSchedule;
