"use server";

import { addOwnDaysOff, deleteTherapistDaysOff } from "@/services/therapist.service";
import { IAddNewOffDayReqBody } from "@/types/therapist.model";
import { revalidateTag } from "next/cache";

export const addOwnDaysOffAction = async (data: IAddNewOffDayReqBody) => {
  const res = await addOwnDaysOff(data);
  if (res) {
    revalidateTag("own-therapist-schedule-days-off");
    return true;
  }
  return false;
};

export const deleteOwnDaysOffByIdAction = async (id: number) => {
  const res = await deleteTherapistDaysOff(id);
  if (res) {
    revalidateTag("own-therapist-schedule-days-off");
    return true;
  }
  return false;
};
