import { FC } from "react";
import * as zod from "zod";
import { signupFormValidation } from "./index.constant";

export interface ISignupScreenProps {}

export type TSignupScreenFC = FC<ISignupScreenProps>;

export type TSignupFormValidation = zod.infer<typeof signupFormValidation>;
