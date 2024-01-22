import { BoxProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export interface IFlexBoxProps extends BoxProps, PropsWithChildren {}

export type TFlexBoxFC = FC<IFlexBoxProps>;
