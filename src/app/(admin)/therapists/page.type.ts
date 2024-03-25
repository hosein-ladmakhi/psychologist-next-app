import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface ITherapistsPageSearchParams {
  page: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface ITherapistPageProps extends INextPage<{}, ITherapistsPageSearchParams> {}

export type ITherapistsPageFC = FC<ITherapistPageProps>;
