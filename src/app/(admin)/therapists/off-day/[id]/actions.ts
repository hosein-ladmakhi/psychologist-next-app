"use server";

import { addTherapistDaysOff, deleteTherapistDaysOff } from "@/services/therapist.service";
import { IAddNewOffDayReqBody } from "@/types/therapist.model";
import { revalidateTag } from "next/cache";

export const deleteDaysOffAction = async (id: number) => {
  const res = await deleteTherapistDaysOff(id);
  if (res) {
    revalidateTag("therapist-schedule-days-off");
    return true;
  }

  return false;
};

export const addDaysOfAction = async (data: IAddNewOffDayReqBody) => {
  const res = await addTherapistDaysOff(data);
  if (res) {
    revalidateTag("therapist-schedule-days-off");
    return true;
  }

  return false;
};
