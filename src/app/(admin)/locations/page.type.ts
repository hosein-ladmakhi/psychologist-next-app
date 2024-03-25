import { INextPage } from "@/types/base.model";
import { FC } from "react";

export interface ILocationSearchParamPage {
  page: string;
}

export interface ILocationsPageProps extends INextPage<{}, ILocationSearchParamPage> {}

export type TLocationsPageFC = FC<ILocationsPageProps>;
