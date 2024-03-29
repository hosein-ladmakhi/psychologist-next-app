import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface IPatientSearchParamPage {
  page: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface IPatientsPageProps extends INextPage<{}, IPatientSearchParamPage> { }

export type TPatientsPageFC = FC<IPatientsPageProps>;
