import Modal from "@/components/Modal";
import { TCreateDayOffDialogFC, TCreateDayOffFormValidation } from "./index.type";
import DatePicker from "@/components/DatePicker";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { IAddNewOffDayReqBody, ITherapistSchedules } from "@/types/therapist.model";
import { getOwnSchedulesTherapist } from "@/services/therapist.service";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDayOffFormValidation } from "./index.constant";
import { APP_DATE_FORMAT } from "@/constants";
import { addOwnDaysOffAction } from "@/app/(therapist)/therapist/off-day/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { getDate } from "@/utils/getDate";

const CreateDayOffDialog: TCreateDayOffDialogFC = ({ onClose, offDays }) => {
  const { control, watch, handleSubmit, setError, clearErrors } = useForm<TCreateDayOffFormValidation>({
    defaultValues: { date: moment() },
    resolver: zodResolver(createDayOffFormValidation),
  });
  const [loading, handleTransition] = useTransition();
  const [therapistsSchedules, setTherapistsSchedules] = useState<ITherapistSchedules[]>([]);
  const [therapistsSchedulesAfterFilter, setTherapistsSchedulesAfterFilter] = useState<ITherapistSchedules[]>([]);
  const [therapistsSchedulesLoading, setTherapistsSchedulesLoading] = useState<boolean>(false);

  useEffect(() => {
    setTherapistsSchedulesLoading(true);
    getOwnSchedulesTherapist()
      .then((data) => setTherapistsSchedules(data))
      .finally(() => setTherapistsSchedulesLoading(false));
  }, []);

  useEffect(() => {
    const date = watch("date");
    if (date) {
      const day = moment(date).isoWeekday();
      const filteredData = therapistsSchedules.filter((schedule) => +schedule.day === +day);
      setTherapistsSchedulesAfterFilter(filteredData);
      if (filteredData.length === 0) setError("schedule", { message: "This Date You Dont Have Any Worksheet ..." });
      else clearErrors("schedule");
    }
  }, [watch("date"), therapistsSchedules, offDays]);

  const SCHEDULES_OPTIONS = therapistsSchedulesAfterFilter.map((schedule) => ({
    key: `${getDate(schedule.day)} ( ${schedule.startHour}_${schedule.endHour} ) ${schedule.location.city} ${schedule.location.address} room ${
      schedule.room
    }`,
    value: schedule.id,
  }));

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const reqBody: IAddNewOffDayReqBody = {
        date: moment(data.date).format(APP_DATE_FORMAT),
        schedule: data.schedule,
      };

      if (offDays.find((element) => element.date === reqBody.date && element.schedule.id === reqBody.schedule)) {
        errorNotify("You Get Days Off For This Day And Time");
        return;
      }

      const res = await addOwnDaysOffAction(reqBody);
      if (res) successNotify("Add New Days Off Successfully ...");
      else errorNotify("Unable To Add Days Off");
      onClose();
    });
  });

  return (
    <Modal handleClose={onClose} title="Create New Day Off" opened size="md">
      <form onSubmit={onSubmit}>
        <DatePicker label="Date" name="date" control={control} />
        <Select
          disabled={therapistsSchedulesLoading || SCHEDULES_OPTIONS.length === 0}
          control={control}
          label="Schedule"
          id="schedule"
          name="schedule"
          options={SCHEDULES_OPTIONS}
        />
        <Box mt={2}>
          <Button loadingSpinnerSize="1.2rem" type="submit" loading={therapistsSchedulesLoading || loading} fullWidth size="large">
            Submit
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateDayOffDialog;
