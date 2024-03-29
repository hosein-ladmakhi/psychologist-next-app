import { ITherapist } from "@/types/therapist.model";
import { FC } from "react";
import zod from "zod";
import { filterAdminFormValidation } from "@/screens/Admin/Admins/components/FilterAdminsDialog/index.constant";

export interface IFilterTherapistDialogProps {
  onClose: () => void;
  onChangeFilters: (data: TFilterTherapistFormValidation) => void;
}

export type TFilterTherapistFormValidation = Partial<Pick<ITherapist, "firstName" | "lastName" | "phone">>;

export type TFilterTherapistDialogFC = FC<IFilterTherapistDialogProps>;

export type TFilterAdminsFormValidation = zod.infer<typeof filterAdminFormValidation>