import Modal from "@/components/Modal";
import { TAddNewOffDayDialogFC, TAddNewOffDayFormValidation } from "./index.type";
import { addNewOffDayFormValidation } from "./index.constant";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { useEffect, useMemo, useTransition } from "react";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import DatePicker from "@/components/DatePicker";
import { IAddNewOffDayReqBody } from "@/types/therapist.model";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirm } from "material-ui-confirm";
import { addDaysOfAction } from "@/app/(admin)/admin/therapists/off-day/[id]/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { getDate } from "@/utils/getDate";
import useTherapistSchedule from "@/hooks/api/useTherapistSchedule";
import { APP_DATE_FORMAT } from "@/constants";

const AddNewOffDayDialog: TAddNewOffDayDialogFC = ({ therapist, onClose }) => {
  const confirmation = useConfirm();
  const [pending, handleTransition] = useTransition();
  const { therapistSchedules, therapistSchedulesLoading } = useTherapistSchedule(therapist.id, 1000000);
  const { control, setValue, watch, handleSubmit, setError } = useForm<TAddNewOffDayFormValidation>({
    resolver: zodResolver(addNewOffDayFormValidation),
    defaultValues: { date: moment() },
  });

  useEffect(() => {
    setValue("therapist", `${therapist?.firstName} ${therapist?.lastName}`);
  }, [therapist]);

  useEffect(() => {
    const date = watch("date");
    if (moment(date).isValid()) {
      setValue("day", getDate(moment(date).isoWeekday()));
    } else {
      setValue("day", "Unknown Day");
    }
  }, [watch("date")]);

  const filteredAndTranformedSchedule = useMemo(() => {
    const date = watch("date");
    const dayNumber = moment(date).isoWeekday();
    let data = therapistSchedules;
    if (date) {
      data = data.filter((element) => element.day === dayNumber);
    }
    return data.map((schedule) => ({
      key: `${schedule.location.city} ${schedule.location.address} Room ${schedule.room} - ( ${getDate(schedule.day)} ${schedule.startHour} - ${
        schedule.endHour
      } ) - ${schedule.type}`,
      value: schedule.id,
    }));
  }, [watch("date"), therapistSchedules]);

  const onSubmit = handleSubmit((data) => {
    if (!moment(data.date).isValid()) {
      setError("date", { message: "You Must Select Your Date" });
      return;
    }
    const reqBody: IAddNewOffDayReqBody = {
      date: moment(data.date).format(APP_DATE_FORMAT),
      schedule: data.schedule,
    };
    confirmation({ title: `Are You Sure To Save Your Day Off In ${reqBody.date}` }).then(() => {
      handleTransition(async () => {
        const res = await addDaysOfAction(reqBody);
        if (res) successNotify("Add Days Off Successfully");
        else errorNotify("Adding Days Off Failed ...");
        onClose();
      });
    });
  });

  return (
    <Modal size="xl" opened title="Add New Off Day">
      <form onSubmit={onSubmit}>
        <TextInput control={control} label="Therapist" name="therapist" disabled />
        <DatePicker control={control} label="Date" name="date" />
        <TextInput control={control} label="" name="day" disabled />
        <Select
          control={control}
          id="select-schedules"
          label="Schedule"
          name="schedule"
          options={filteredAndTranformedSchedule}
          disabled={therapistSchedulesLoading}
        />
        <Box mt={2}>
          <Button type="submit" loading={therapistSchedulesLoading || pending} fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default AddNewOffDayDialog;
