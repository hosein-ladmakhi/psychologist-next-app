import zod from "zod";

export const answerTicketFormValidation = zod.object({
  answer: zod.string({ required_error: "You must enter your answer" }),
});
