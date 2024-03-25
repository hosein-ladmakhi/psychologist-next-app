"use server";

import { addNewSchedule, deleteScheduleById } from "@/services/therapist.service";
import { IAddNewScheduleToTherapistReqBody } from "@/types/therapist.model";
import { revalidateTag } from "next/cache";

export const addNewScheduleAction = async (data: IAddNewScheduleToTherapistReqBody) => {
  const res = await addNewSchedule(data);
  if (res) {
    revalidateTag("therapists-schedules");
    return true;
  }
  return false;
};

export const deleteScheduleByIdAction = async (id: number) => {
  const res = await deleteScheduleById(id);
  if (res) {
    revalidateTag("therapists-schedules");
    return true;
  }
  return false;
};
