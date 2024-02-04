"use server";

import { addOwnNewSchedule, deleteScheduleById } from "@/services/therapist.service";
import { TAddNewOwnScheduleReqBody } from "@/types/therapist.model";
import { revalidateTag } from "next/cache";

export const addOwnNewScheduleAction = async (data: TAddNewOwnScheduleReqBody) => {
  const res = await addOwnNewSchedule(data);
  if (res) {
    revalidateTag("own-schedules");
    return true;
  }
  return false;
};

export const deleteOwnScheduleAction = async (id: number) => {
  const res = await deleteScheduleById(id);
  if (res) {
    revalidateTag("own-schedules");
    return true;
  }
  return false;
};
