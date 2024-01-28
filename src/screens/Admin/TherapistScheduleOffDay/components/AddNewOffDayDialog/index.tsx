import Modal from "@/components/Modal";
import { TAddNewOffDayDialogFC, TAddNewOffDayFormValidation } from "./index.type";
import { ADD_NEW_OFF_DAY_DIALOG_SUBJECT, addNewOffDayFormValidation } from "./index.constant";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { useEffect, useMemo, useState, useTransition } from "react";
import { getSchedulesTherapist } from "@/services/therapist.service";
import { DATES } from "@/constants";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import DatePicker from "@/components/DatePicker";
import { IAddNewOffDayReqBody, ITherapistSchedules } from "@/types/therapist.model";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirm } from "material-ui-confirm";
import { addDaysOfAction } from "@/app/(admin)/admin/therapists/off-day/[id]/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const AddNewOffDayDialog: TAddNewOffDayDialogFC = ({ therapist, onClose }) => {
  const confirmation = useConfirm();
  const [pending, handleTransition] = useTransition();
  const [therapistSchedules, setTherapistSchedules] = useState<ITherapistSchedules[]>([]);
  const [therapistSchedulesLoading, setTherapistSchedulesLoading] = useState<boolean>(false);
  const { control, setValue, watch, handleSubmit, setError } = useForm<TAddNewOffDayFormValidation>({
    resolver: zodResolver(addNewOffDayFormValidation),
    defaultValues: { date: moment() },
  });

  useEffect(() => {
    setTherapistSchedulesLoading(true);
    getSchedulesTherapist(therapist.id, { limit: 100000 })
      .then(({ content }) => {
        setTherapistSchedules(content);
      })
      .finally(() => {
        setTherapistSchedulesLoading(false);
      });
  }, [therapist.id]);

  useEffect(() => {
    setValue("therapist", `${therapist?.firstName} ${therapist?.lastName}`);
  }, [therapist]);

  useEffect(() => {
    const date = watch("date");
    if (moment(date).isValid()) {
      setValue("day", (DATES as any)[moment(date).isoWeekday().toString()]);
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
      key: `${schedule.location.city} ${schedule.location.address} Room ${schedule.room} - ( ${(DATES as any)[schedule.day]} ${
        schedule.startHour
      } - ${schedule.endHour} ) - ${schedule.type}`,
      value: schedule.id,
    }));
  }, [watch("date"), therapistSchedules]);

  const onSubmit = handleSubmit((data) => {
    if (!moment(data.date).isValid()) {
      setError("date", { message: "You Must Select Your Date" });
      return;
    }
    const reqBody: IAddNewOffDayReqBody = {
      date: moment(data.date).format("YYYY-MM-DD"),
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
    <Modal size="xl" subject={ADD_NEW_OFF_DAY_DIALOG_SUBJECT} title="Add New Off Day">
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
          <Button type="submit" loading={therapistSchedulesLoading} fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default AddNewOffDayDialog;
