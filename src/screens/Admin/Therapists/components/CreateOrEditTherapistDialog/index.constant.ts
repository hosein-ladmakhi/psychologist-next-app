import { EDegtreeOfEducation } from "@/types/therapist.model";
import * as zod from "zod";

export const createOrEditTherapistFormValidation = zod.object({
  firstName: zod.string({ required_error: "You Must Provide Your First Name" }).min(3, "Your First Name Must Include 3 Character"),
  lastName: zod.string({ required_error: "You Must Provide Your Last Name" }).min(3, "Your First Name Must Include 3 Character"),
  phone: zod.string({ required_error: "You Must Provide Your Phone Number" }).length(11, "Your Phone Number Has Invalid Format"),
  phone2: zod.string({ required_error: "You Must Provide Your Phone Number 2" }).length(11, "Your Phone Number 2 Has Invalid Format"),
  bio: zod.string({ required_error: "You Must Provide Your Biography" }).min(3, "Your Biography Must Include 3 Character"),
  address: zod.string({ required_error: "You Must Provide Your Home Address" }).min(3, "Your Home Address Must Include 3 Character"),
  workingFields: zod.array(zod.number()).min(1, "You Should Select At Least One Working Fields").default([]),
  degreeOfEducation: zod
    .string({
      required_error: "You Must Fill Degree Of Education",
    })
    .refine((arg) => Object.values(EDegtreeOfEducation).includes(arg as any), "You Must Fill Degree Of Education"),
  gender: zod.boolean().default(false),
});
