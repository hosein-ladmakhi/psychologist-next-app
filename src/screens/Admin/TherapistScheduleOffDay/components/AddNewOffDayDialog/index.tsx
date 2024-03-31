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
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfirm } from "material-ui-confirm";
import { errorNotify, successNotify } from "@/core/notification";
import { getDayOfWeekName } from "@/utils/getDate";
import useTherapistSchedule from "@/hooks/api/useTherapistSchedule";
import { getScheduleTypeEnum } from "@/utils/getEnumTransformer";
import { addDaysOfAction } from "@/app/(admin)/therapists/off-day/[id]/actions";
import { dateTool } from "@/core/dates";

const AddNewOffDayDialog: TAddNewOffDayDialogFC = ({ therapist, onClose }) => {
  const confirmation = useConfirm();
  const [pending, handleTransition] = useTransition();
  const { therapistSchedules, therapistSchedulesLoading } = useTherapistSchedule(therapist.id, 1000000);
  const { control, setValue, watch, handleSubmit, setError } = useForm<TAddNewOffDayFormValidation>({
    resolver: zodResolver(addNewOffDayFormValidation),
    defaultValues: {
      date: new Date()
    },
  });


  useEffect(() => {
    setValue("therapist", `${therapist?.firstName} ${therapist?.lastName}`);
  }, [therapist]);

  useEffect(() => {
    const date = watch("date");
    if (dateTool.isValidDate(date)) {
      setValue("day", getDayOfWeekName(dateTool.getWeekDay(date)));
    } else {
      setValue("day", "Unknown Day");
    }
  }, [watch("date")]);

  const filteredAndTranformedSchedule = useMemo(() => {
    const date = watch("date");
    const dayNumber = dateTool.getWeekDay(date);
    let data = therapistSchedules;
    if (date) {
      data = data.filter((element) => element.day === dayNumber);
    }
    return data.map((schedule) => ({
      key: `${schedule.location.city} ${schedule.location.address} اتاق ${schedule.room} - ( ${getDayOfWeekName(schedule.day)} ${schedule.startHour} - ${schedule.endHour
        } ) - ${getScheduleTypeEnum(schedule.type)}`,
      value: schedule.id,
    }));
  }, [watch("date"), therapistSchedules]);

  const onSubmit = handleSubmit((data) => {
    if (!dateTool.isValidDate(data.date)) {
      setError("date", { message: "تاریخ ثبت مرخصی باید پر شود" });
      return;
    }
    const reqBody: IAddNewOffDayReqBody = {
      date: dateTool.formatDate(data.date, 'en'),
      schedule: data.schedule,
    };
    confirmation({ title: `آیا از ثبت مرخصی جدید در تاریخ ${reqBody.date} اطمینان دارید ؟`, confirmationText: "بله اطمینان دارم", cancellationText: "خیر , لفو درخواست مرخصی" }).then(() => {
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
        <TextInput control={control} label="روز مرخصی" name="day" disabled />
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
