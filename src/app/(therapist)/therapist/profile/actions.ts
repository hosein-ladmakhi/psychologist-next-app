"use server";

import { TCreateOrEditOwnTherapistFormValidation } from "@/screens/Therapist/Profile/index.type";
import { updateOwnTherapistProfile } from "@/services/therapist.service";
import { ICreateOrEditTherapistReqBody } from "@/types/therapist.model";
import { revalidateTag } from "next/cache";

export const updateOwnTherapistProfileAction = async (data: TCreateOrEditOwnTherapistFormValidation) => {
  const res = await updateOwnTherapistProfile(data as ICreateOrEditTherapistReqBody);
  if (res) {
    revalidateTag("profile");
    return true;
  }
  return false;
};
