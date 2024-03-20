"use client";

import { TTherapistScheduleByTherapistIdScreenFC } from "./index.type";
import { Button, Typography } from "@mui/material";
import Table from "@/components/Table";
import { therapistScheduleColumns } from "./index.constant";
import { calculateTotalPageTable } from "@/utils/calculateTotalPageTable";
import { Suspense, useMemo, useState, useTransition } from "react";
import { deleteScheduleByIdAction } from "@/app/(admin)/admin/therapists/schedules/[therapistId]/[day]/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import FlexBox from "@/components/FlexBox";
import dynamic from "next/dynamic";
import { getDate } from "@/utils/getDate";
import { getScheduleTypeEnum } from "@/utils/getEnumTransformer";

const CreateNewSchedule = dynamic(() => import("./components/CreateNewSchedule"));

const TherapistScheduleByTherapistIdScreen: TTherapistScheduleByTherapistIdScreenFC = ({ schedules, schedulesCount, therapist, selectedDay }) => {
  const [pending, handleTransition] = useTransition();
  const [isShowCreateScheduleDialog, setShowCreateScheduleDialogStatus] = useState<boolean>(false);

  const selectedDayText = getDate(selectedDay!);

  const transformedSchedule = useMemo(() => {
    return schedulesCount === 0
      ? []
      : schedules?.map((schedule) => ({
          ...schedule,
          locationAddress: `${schedule.location?.city}-${schedule.location?.address}`,
          transformedType: getScheduleTypeEnum(schedule.type),
        })) || [];
  }, [schedules, schedulesCount]);

  const handleCreate = () => {
    setShowCreateScheduleDialogStatus(true);
  };

  const onClose = () => {
    setShowCreateScheduleDialogStatus(false);
  };

  const handleDelete = (selectedSchedule: any) => {
    handleTransition(async () => {
      const res = await deleteScheduleByIdAction(selectedSchedule?.id);
      if (res) successNotify("آیتم رزرو انتخاب شده با موفقیت حذف گردید");
      else errorNotify("عملیات حذف آیتم رزرو شده با شکست مواجعه شد");
      onClose();
    });
  };

  return (
    <div>
      {schedulesCount === 0 && (
        <FlexBox justifyContent="space-between">
          <Typography variant="body1" component="h1" fontWeight="bold">
            آیتم رزوی ساخته نشده است
          </Typography>
          <Button disabled={pending} onClick={handleCreate} color="secondary">
            ساخت آیتم رزرو جدید
          </Button>
        </FlexBox>
      )}

      {isShowCreateScheduleDialog && (
        <Suspense fallback={<></>}>
          <CreateNewSchedule onClose={onClose} therapist={therapist} day={selectedDay} dayText={selectedDayText} />
        </Suspense>
      )}

      {schedulesCount > 0 && (
        <Table
          rows={transformedSchedule}
          columns={therapistScheduleColumns}
          dataKey="id"
          title={`چارت رزرو ${therapist.firstName} ${therapist.lastName} در روز ${selectedDayText}`}
          currentPage={1}
          totalPage={calculateTotalPageTable(schedulesCount)}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
          createButtonLabel="ساخت آیتم رزرو جدید"
          loading={pending}
        />
      )}
    </div>
  );
};

export default TherapistScheduleByTherapistIdScreen;
