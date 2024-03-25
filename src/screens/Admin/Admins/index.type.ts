import { IAdmin } from "@/types/admin.model";
import type { FC } from "react"

interface IAdminsScreenProps {
    total: number;
    page: number;
    data: IAdmin[]
}

export type TAdminsScreenFC = FC<IAdminsScreenProps>