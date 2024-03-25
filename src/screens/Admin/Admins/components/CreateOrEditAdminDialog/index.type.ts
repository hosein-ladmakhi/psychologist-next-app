import zod from "zod"
import { createOrEditAdminFormValidation } from "./index.constant"
import { IAdmin } from "@/types/admin.model";

export type TCreateOrEditAdminFormValidation = zod.infer<typeof createOrEditAdminFormValidation>

export interface ICreateOrEditAdminDialogProps {
    isOpen?: boolean;
    handleClose: () => void;
    selectedAdmin?: IAdmin
}