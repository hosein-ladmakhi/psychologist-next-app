"use server";

import { uploadOrderDocumenation } from "@/services/documenation.service";
import { changeOrderStatus, createOrder } from "@/services/order.service";
import { EOrderStatus, ICreateOrder } from "@/types/order.model";
import { revalidateTag } from "next/cache";

export const uploadDocumentationAndDoneOrderAction = async (orderId: number, data: FormData) => {
  try {
    await uploadOrderDocumenation(data);
    const orderRes = await changeOrderStatus(orderId, { status: EOrderStatus.Done });
    revalidateTag("orders");
    return orderRes;
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrderAction = async (id: number) => {
  const res = await changeOrderStatus(id, { status: EOrderStatus.Cancel });
  if (res) {
    revalidateTag("orders");
    return true;
  }
  return false;
};

export const createOrderAction = async (data: ICreateOrder) => {
  const res = await createOrder(data);
  if (res) {
    revalidateTag("orders");
    return true;
  }
  return false;
};
