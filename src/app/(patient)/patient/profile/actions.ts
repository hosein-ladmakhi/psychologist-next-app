"use server";

import { updatePassword } from "@/services/auth.service";
import { updateOwnPatientProfile } from "@/services/patient.service";
import { IPasswordUpdateReqBody } from "@/types/auth.model";
import { TCreateOrEditPatientBody } from "@/types/patient.model";
import { revalidateTag } from "next/cache";

export const updatePasswordAction = async (reqBody: IPasswordUpdateReqBody) => {
  const res = await updatePassword(reqBody);
  console.log(res);
  return res;
};

export const updateProfileAction = async (reqBody: TCreateOrEditPatientBody) => {
  const res = await updateOwnPatientProfile(reqBody);
  if (res) {
    revalidateTag("profile");
    return true;
  }
  return false;
};
