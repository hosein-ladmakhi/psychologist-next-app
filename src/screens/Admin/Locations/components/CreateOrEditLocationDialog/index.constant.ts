import * as zod from "zod";
export const UPSERT_LOCATION_DIALOG_SUBJECT = "UPSERT_LOCATION_DIALOG_SUBJECT";

export const createOrEditLocationFormValidation = zod.object({
  city: zod.string({ required_error: "You Must Select The City" }),
  address: zod.string({ required_error: "You Must Fill The Address" }).min(3, "Your Address Must At Least 3 Character"),
});
