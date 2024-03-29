import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface IAdminSearchParamPage {
    page: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    isActive?:boolean;
}

export interface IAdminPageProps extends INextPage<{}, IAdminSearchParamPage> { }

export type TAdminsPageFC = FC<IAdminPageProps>;
