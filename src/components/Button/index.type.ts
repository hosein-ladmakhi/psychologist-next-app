import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export type TButtonColor = "error" | "primary" | "secondary" | "info" | "success" | "warning" | "inherit";

export type TButtonSize = "large" | "small" | "medium";

export type TButtonVariant = "contained" | "outlined" | "text";

export interface IButtonProps extends PropsWithChildren {
  fullWidth?: boolean;
  color?: TButtonColor;
  size?: TButtonSize;
  variant?: TButtonVariant;
  loading?: boolean;
  loadingText?: string;
  loadingSpinnerSize?: string;
}

export type TButtonFC = FC<IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>;
