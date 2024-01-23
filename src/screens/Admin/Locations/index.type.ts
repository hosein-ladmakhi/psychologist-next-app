import { ILocation } from "@/types/location.model";
import { FC } from "react";

export interface ILocationsScreenProps {
  data: ILocation[];
  count: number;
  page: number;
}

export type TLocationsScreenFC = FC<ILocationsScreenProps>;
