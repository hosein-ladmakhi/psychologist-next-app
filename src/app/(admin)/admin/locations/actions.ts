"use server";

import { createLocation, deleteLocation, editLocation } from "@/services/location.service";
import { ICreateOrEditLocationReqBody } from "@/types/location.model";
import { revalidateTag } from "next/cache";

export const deleteLocationAction = async (id: number) => {
  const res = await deleteLocation(id);
  if (res) {
    revalidateTag("locations");
    return true;
  }
  return false;
};

export const createLocationAction = async (data: ICreateOrEditLocationReqBody) => {
  const res = await createLocation(data);
  if (res) {
    revalidateTag("locations");
    return true;
  }
  return false;
};

export const editLocationAction = async (id: number, data: ICreateOrEditLocationReqBody) => {
  const res = await editLocation(id, data);
  if (res) {
    revalidateTag("locations");
    return true;
  }
  return false;
};
