import zod from "zod";

export const filterAdminFormValidation = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  phone: zod.string(),
  status: zod.string()
})