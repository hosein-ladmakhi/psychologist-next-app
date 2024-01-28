import { FC } from "react";
import * as zod from "zod";
import { loginFormValidation } from "./index.constant";

interface ILoginScreenProps {}

export type TLoginScreenFC = FC<ILoginScreenProps>;

export type TLoginFormValidation = zod.infer<typeof loginFormValidation>;
