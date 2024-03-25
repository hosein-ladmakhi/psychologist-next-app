'use server'

import { updatePasswordById } from "@/services/auth.service"
import { IPasswordUpdateReqBody } from "@/types/auth.model"

export const updatePasswordAction = async (id: number, data: IPasswordUpdateReqBody) => {
    const res = await updatePasswordById(id, data)
    return res.success;
}