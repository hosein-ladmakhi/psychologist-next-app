import { ButtonHTMLAttributes, FC, PropsWithChildren, ReactNode } from "react";
import { CircularProgress, Button as MuiButton } from "@mui/material";

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

const Button: TButtonFC = ({
  fullWidth = false,
  color = "primary",
  size = "medium",
  variant = "contained",
  loading = false,
  children,
  loadingText,
  loadingSpinnerSize,
  ...attributeProps
}) => {
  return (
    <MuiButton variant={variant} size={size} {...attributeProps} fullWidth={fullWidth} color={color} disabled={attributeProps.disabled || loading}>
      {loading && loadingText && <>{loadingText}</>}
      {loading && !loadingText && <CircularProgress size={loadingSpinnerSize} color="inherit" />}
      {children}
    </MuiButton>
  );
};

export default Button;
