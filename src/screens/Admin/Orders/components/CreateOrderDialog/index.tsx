import Modal from "@/components/Modal";
import { TCreateOrderDialogFC, TCreateOrderFormValidation } from "./index.type";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import { useEffect, useMemo, useState, useTransition } from "react";
import { IPatient } from "@/types/patient.model";
import { getPatientsPageApi } from "@/services/patient.service";
import { ETherapistScheduleType, ITherapist, ITherapistSchedules } from "@/types/therapist.model";
import { getSchedulesTherapist, getTherapists } from "@/services/therapist.service";
import { getDate } from "@/utils/getDate";
import { removeDuplicatedSelectKey } from "@/utils/selectOptions";
import { getReservationCalendarByTherapistAndDay } from "@/services/order.service";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrderFormValidation } from "./index.constant";
import { ICreateOrder } from "@/types/order.model";
import { errorNotify, successNotify } from "@/utils/notify";
import { createOrderAction } from "@/app/(admin)/admin/orders/actions";
import { getScheduleTypeEnum } from "@/utils/getEnumTransformer";

const CreateOrderDialog: TCreateOrderDialogFC = ({ onClose }) => {
  const { control, watch, setValue, handleSubmit, setError } = useForm<TCreateOrderFormValidation>({
    resolver: zodResolver(createOrderFormValidation),
  });
  const [pending, handleTransition] = useTransition();
  const watchedDay = watch("day");
  const watchedTime = watch("time");
  const watchedTherapist = watch("therapist");

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState<boolean>(false);
  useEffect(() => {
    setPatientsLoading(true);
    getPatientsPageApi({ limit: 50000 })
      .then((data) => {
        setPatients(data?.content || []);
      })
      .finally(() => {
        setPatientsLoading(false);
      });
  }, []);

  const [therapists, setTherapists] = useState<ITherapist[]>([]);
  const [therapistsLoading, setTherapistsLoading] = useState<boolean>(false);
  useEffect(() => {
    setTherapistsLoading(true);
    getTherapists({ limit: 50000 })
      .then((data) => {
        setTherapists(data?.content || []);
      })
      .finally(() => {
        setTherapistsLoading(false);
      });
  }, []);

  const [therapistSchedules, setTherapistSchedules] = useState<ITherapistSchedules[]>([]);
  const [therapistSchedulesLoading, setTherapistSchedulesLoading] = useState<boolean>(false);
  const currentSchedule = useMemo(
    () => therapistSchedules.find((element) => `${element.day}_${element.startHour}_${element.endHour}` === `${watchedDay}_${watchedTime}`),
    [watchedDay, watchedTime]
  );
  useEffect(() => {
    if (watchedTherapist) {
      setTherapistSchedulesLoading(false);
      getSchedulesTherapist(watchedTherapist)
        .then((data) => {
          setTherapistSchedules(data?.content || []);
        })
        .finally(() => {
          setTherapistSchedulesLoading(false);
        });
    }
  }, [watchedTherapist]);

  useEffect(() => {
    if (currentSchedule) {
      setValue("location", `${currentSchedule.location.city} ${currentSchedule.location.address}`);
      setValue("room", currentSchedule.room);
    } else {
      setValue("location", "");
      setValue("room", "");
    }
  }, [currentSchedule]);

  const [reservationDates, setReservationDates] = useState<string[]>([]);
  const [reservationDatesLoading, setReservationDatesLoading] = useState<boolean>(false);
  useEffect(() => {
    if (watchedTherapist && watchedDay && watchedTime) {
      setReservationDatesLoading(true);
      getReservationCalendarByTherapistAndDay(watchedTherapist, watchedDay, watchedTime)
        .then((data) => {
          setReservationDates(data.dates);
        })
        .finally(() => {
          setReservationDatesLoading(false);
        });
    }
  }, [watchedTherapist, watchedDay, watchedTime]);

  const PATIENTS_SELECT_OPTIONS = patients.map((patient) => ({ key: `${patient.firstName} ${patient.lastName}`, value: patient.id }));

  const THERAPISTS_SELECT_OPTIONS = therapists.map((therapist) => ({ key: `${therapist.firstName} ${therapist.lastName}`, value: therapist.id }));

  const SCHEDULES_DAY_SELECT_OPTIONS = removeDuplicatedSelectKey(
    therapistSchedules.map((schedule) => ({
      key: getDate(schedule.day),
      value: schedule.day,
    }))
  );

  const SCHEDULES_TIME_SELECT_OPTIONS = removeDuplicatedSelectKey(
    therapistSchedules
      .filter((schedule) => {
        const day = +watchedDay;
        return isNaN(day) || !day ? true : schedule.day === day;
      })
      .map((schedule) => ({
        key: `${schedule.startHour} _ ${schedule.endHour}`,
        value: `${schedule.startHour}_${schedule.endHour}`,
      }))
  );

  const SCHEDULES_DATE_SELECT_OPTIONS = reservationDates.map((date) => ({ key: date, value: date }));

  const SCHEDULES_CATEGORIES_SELECT_OPTIONS = removeDuplicatedSelectKey(
    therapists
      .find((element) => element.id === watchedTherapist)
      ?.workingFields?.map((workField) => ({ key: workField.faName, value: workField.id })) || []
  );

  const getScheduleTypeOption = () => {
    if (!currentSchedule) return [];
    if (currentSchedule?.type === ETherapistScheduleType.both) {
      return Object.entries(ETherapistScheduleType).map(([key, value]) => ({ key: getScheduleTypeEnum(key as ETherapistScheduleType), value }));
    }
    return [
      {
        key: getScheduleTypeEnum(currentSchedule?.type!),
        value: currentSchedule?.type,
      },
    ];
  };

  const onSubmit = handleSubmit((data) => {
    const [startHour, endHour] = data.time.split("_");
    const selectedSchedule = therapistSchedules.find((element) => element.startHour === startHour && element.endHour === endHour);
    if (!selectedSchedule) {
      errorNotify("عملیات دریافت نوبت با شکست مواجعه شد");
      return;
    }

    const reqBody: ICreateOrder = {
      ...data,
      startHour,
      endHour,
      location: selectedSchedule?.location?.id!,
      room: selectedSchedule?.room!,
      type: data.type as any,
    };

    handleTransition(async () => {
      const res = await createOrderAction(reqBody);
      if (res) successNotify("دریافت نوبت با موفقیت انجام شد");
      else errorNotify("عملیات دریافت نوبت رزرو با شکست مواجعه شد");
      onClose();
    });
  });

  return (
    <Modal title="فرم دریافت نوبت" opened handleClose={onClose} size="xl">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Select control={control} id="order-patients" label="بیمار" name="patient" options={PATIENTS_SELECT_OPTIONS} disabled={patientsLoading} />
          </Grid>
          <Grid item md={6}>
            <Select
              control={control}
              id="order-therapists"
              label="پزشک"
              name="therapist"
              options={THERAPISTS_SELECT_OPTIONS}
              disabled={therapistsLoading}
            />
          </Grid>
          <Grid item md={6}>
            <Select
              control={control}
              id="order-schedules-day"
              label="روز هفته"
              name="day"
              options={SCHEDULES_DAY_SELECT_OPTIONS}
              disabled={therapistSchedulesLoading || !watchedTherapist}
            />
          </Grid>
          <Grid item md={6}>
            <Select
              control={control}
              id="order-schedules-time"
              label="بازه زمانی"
              name="time"
              options={SCHEDULES_TIME_SELECT_OPTIONS}
              disabled={therapistSchedulesLoading || !watchedDay}
            />
          </Grid>
          <Grid item md={6}>
            <Select
              control={control}
              id="order-schedules-date"
              label="تاریخ برگزاری"
              name="date"
              options={SCHEDULES_DATE_SELECT_OPTIONS}
              disabled={reservationDatesLoading || !watchedTherapist || !watchedTime}
            />
          </Grid>
          <Grid item md={6}>
            <Select
              control={control}
              id="order-schedules-categories"
              label="زمینه های تخصصی"
              name="categories"
              options={SCHEDULES_CATEGORIES_SELECT_OPTIONS}
              multiple
              defaultValue={[]}
              disabled={reservationDatesLoading || !watchedTherapist || !watchedTime}
            />
          </Grid>
          <Grid item md={12}>
            <Select
              disabled={!watchedDay || !watchedTime}
              control={control}
              id="order-schedules-type"
              label="شیوه برگزاری"
              name="type"
              options={getScheduleTypeOption()}
            />
          </Grid>
          <Grid item md={6}>
            <TextInput control={control} label="محل برگزاری" name="location" disabled />
          </Grid>
          <Grid item md={6}>
            <TextInput control={control} label="اتاق" name="room" disabled />
          </Grid>
          <Grid item md={3}>
            <Button loading={pending} loadingSpinnerSize="1rem" type="submit" fullWidth size="large">
              دریافت نوبت
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateOrderDialog;
