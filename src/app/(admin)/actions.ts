'use server'

import { createAdmin, deleteAdminById, editAdminById } from "@/services/admin.service";
import { ICreateOrEditAdminReqBody } from "@/types/admin.model"
import { revalidateTag } from "next/cache";

export const createAdminAction = async (data: ICreateOrEditAdminReqBody) => {
    const res = await createAdmin(data);
    if (res?.id) {
        revalidateTag("admins")
        return true;
    }
    return false;
}

export const editAdminAction = async (data: ICreateOrEditAdminReqBody) => {
    const { id, password, ...reqBody } = data;
    const res = await editAdminById(id!, reqBody);
    if (res?.id) {
        revalidateTag("admins")
        return true;
    }
    return false;
}


export const deleteAdminAction = async (id: number) => {
    const res = await deleteAdminById(id);
    if(res) {
        revalidateTag("admins");
        return true
    }
    return false;
}