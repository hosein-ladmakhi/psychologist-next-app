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
import { errorNotify, successNotify } from "@/utils/notify";
import { getDate } from "@/utils/getDate";
import useTherapistSchedule from "@/hooks/api/useTherapistSchedule";
import { APP_DATE_FORMAT } from "@/constants";
import { getScheduleTypeEnum } from "@/utils/getEnumTransformer";
import { addDaysOfAction } from "@/app/(admin)/therapists/off-day/[id]/actions";

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
      key: `${schedule.location.city} ${schedule.location.address} اتاق ${schedule.room} - ( ${getDate(schedule.day)} ${schedule.startHour} - ${
        schedule.endHour
      } ) - ${getScheduleTypeEnum(schedule.type)}`,
      value: schedule.id,
    }));
  }, [watch("date"), therapistSchedules]);

  const onSubmit = handleSubmit((data) => {
    if (!moment(data.date).isValid()) {
      setError("date", { message: "تاریخ ثبت مرخصی باید پر شود" });
      return;
    }
    const reqBody: IAddNewOffDayReqBody = {
      date: moment(data.date).format(APP_DATE_FORMAT),
      schedule: data.schedule,
    };
    confirmation({ title: `آیا از ثبت مرخصی جدید در تاریخ ${reqBody.date} اطمینان دارید ؟` }).then(() => {
      handleTransition(async () => {
        const res = await addDaysOfAction(reqBody);
        if (res) successNotify("عملیات ثبت مرخصی با موفقیت انجام گردید");
        else errorNotify("عملیات ثبت مرخصی با شکست مواجعه شد");
        onClose();
      });
    });
  });

  return (
    <Modal size="xl" opened title="افزودن مرمخصی جدید" handleClose={onClose}>
      <form onSubmit={onSubmit}>
        <TextInput control={control} label="پزشک مورد نظر" name="therapist" disabled />
        <DatePicker control={control} label="تاریخ مرخصی" name="date" />
        <TextInput control={control} label="" name="day" disabled />
        <Select
          control={control}
          id="select-schedules"
          label="آیتم رزروی"
          name="schedule"
          options={filteredAndTranformedSchedule}
          disabled={therapistSchedulesLoading}
        />
        <Box mt={2}>
          <Button type="submit" loading={therapistSchedulesLoading || pending} fullWidth>
            ثبت مرخصی جدید
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default AddNewOffDayDialog;
