"use server";

import { changeOrderStatus } from "@/services/order.service";
import { EOrderStatus } from "@/types/order.model";
import { revalidatePath } from "next/cache";

export const doneOrderStatusAction = async (id: number) => {
  const res = await changeOrderStatus(id, { status: EOrderStatus.Done });
  if (res) {
    revalidatePath(`/therapist/orders/${id}`);
    return true;
  }
  return false;
};

export const revalidateOrderPage = (id: number) => {
  revalidatePath(`/therapist/orders/${id}`);
  return;
};
