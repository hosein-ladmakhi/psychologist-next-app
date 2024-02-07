import { FC, ReactNode } from "react";

interface ISummaryTextProps {
  children: ReactNode;
  lineClamp: number;
}

export type TSummaryTextFC = FC<ISummaryTextProps>;
