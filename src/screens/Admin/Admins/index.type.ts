import { IAdmin } from "@/types/admin.model";
import type { FC } from "react";

interface IAdminsScreenProps {
  count: number;
  page: number;
  data: IAdmin[];
  totalPage: number;
}

export type TAdminsScreenFC = FC<IAdminsScreenProps>;
