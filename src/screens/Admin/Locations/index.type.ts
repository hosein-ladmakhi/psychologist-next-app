import { ILocation } from "@/types/location.model";
import { FC } from "react";

export interface ILocationsScreenProps {
  data: ILocation[];
  count: number;
}

export type TLocationsScreenFC = FC<ILocationsScreenProps>;
