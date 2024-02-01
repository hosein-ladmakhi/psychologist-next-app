import { CircularProgress, Button as MuiButton } from "@mui/material";
import { TButtonFC } from "./index.type";

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
      {loading && !loadingText && <CircularProgress sx={{ marginInlineEnd: "8px" }} size={loadingSpinnerSize} color="inherit" />}
      {children}
    </MuiButton>
  );
};

export default Button;
