"use client";

import Table from "@/components/Table";
import { TTherapistScheduleOffDayScreenFC } from "./index.type";
import { therapistScheduleOffDayColumns } from "./index.constant";
import { Suspense, useMemo, useState, useTransition } from "react";
import { errorNotify, successNotify } from "@/core/notification";
import { useSearchParams } from "@/hooks/useSearchParams";
import FlexBox from "@/components/FlexBox";
import { Typography } from "@mui/material";
import Button from "@/components/Button";
import dynamic from "next/dynamic";
import { getDayOfWeekName } from "@/utils/getDate";
import { getScheduleTypeEnum } from "@/utils/getEnumTransformer";
import { deleteDaysOffAction } from "@/app/(admin)/therapists/off-day/[id]/actions";
import { dateTool } from "@/core/dates";

const AddNewOffDayDialog = dynamic(() => import("./components/AddNewOffDayDialog"));

const TherapistScheduleOffDayScreen: TTherapistScheduleOffDayScreenFC = ({ content, therapist, count, page }) => {
  const [pending, handleTransition] = useTransition();
  const { onChangeSearchParams } = useSearchParams();
  const [isShowAddOffDayDialog, setShowAddOffDayDialogStatus] = useState<boolean>(false);

  const handleCreate = () => {
    setShowAddOffDayDialogStatus(true);
  };

  const handleDelete = (data: any) => {
    handleTransition(async () => {
      const res = await deleteDaysOffAction(data.id);
      if (res) successNotify("مرخصی با موفقیت حذف گردید");
      else errorNotify("عملیات حذف مرخصی با شکست مواجعه شد");
    });
  };

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

  const onCloseDialog = () => {
    setShowAddOffDayDialogStatus(false);
  };

  const transformedData = useMemo(() => {
    return content.map((data) => ({
      ...data,
      day: getDayOfWeekName(data.schedule.day),
      time: `${data.schedule.startHour}_${data.schedule.endHour}`,
      type: data.schedule.type,
      location: `${data.schedule.location.city} - ${data.schedule.location.address}`,
      room: data.schedule.room,
      date: dateTool.formatDate(data.date),
      transformedType: getScheduleTypeEnum(data.schedule.type),
    }));
  }, [content]);

  const therapistFullName = therapist?.firstName + " " + therapist?.lastName;

  return (
    <>
      {isShowAddOffDayDialog && (
        <Suspense fallback={<></>}>
          <AddNewOffDayDialog onClose={onCloseDialog} therapist={therapist} />
        </Suspense>
      )}
      {count === 0 && (
        <FlexBox justifyContent="space-between">
          <Typography variant="body1" component="h1" fontWeight="bold">
            این پزشک مرخصی ندارد
          </Typography>
          <Button disabled={pending} onClick={handleCreate} color="secondary">
            افزودن مرخصی جدید
          </Button>
        </FlexBox>
      )}

      {count > 0 && (
        <Table
          createButtonLabel="افزودن مرخصی جدید"
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          columns={therapistScheduleOffDayColumns}
          rows={transformedData}
          title={`چارت مرخصی های ${therapistFullName}`}
          dataKey="id"
          currentPage={page}
          totalPage={count}
          handleChangePage={handleChangePage}
          loading={pending}
        />
      )}
    </>
  );
};

export default TherapistScheduleOffDayScreen;
