import { FC } from "react";

interface ILoadingTextProps {
  loading?: boolean;
  loadingText: string;
  loadingTextVariant: "body1" | "body2";
  spinnerSize?: string;
}

export type TLoadingTextFC = FC<ILoadingTextProps>;
