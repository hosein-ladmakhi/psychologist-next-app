import zod from "zod";

export const createTicketFormValidation = zod.object({
  title: zod.string({ required_error: "Enter your title please" }).min(3, { message: "Your title must include more than 3 character" }),
  content: zod.string({ required_error: "You must provide the description of ticket" }).min(5, {
    message: "Your description must include more than 5 character",
  }),
});
