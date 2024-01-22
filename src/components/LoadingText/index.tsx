import { CircularProgress, Typography } from "@mui/material";
import FlexBox from "../FlexBox";
import { TLoadingTextFC } from "./index.type";

const LoadingText: TLoadingTextFC = ({ loading, loadingText, loadingTextVariant = "body1", spinnerSize }) => {
  if (!loading) return <></>;
  return (
    <FlexBox width="100%" py={6} flexDirection="column">
      <CircularProgress size={spinnerSize} color="inherit" />
      <Typography mt={2} variant={loadingTextVariant} component="h1">
        {loadingText}
      </Typography>
    </FlexBox>
  );
};

export default LoadingText;
