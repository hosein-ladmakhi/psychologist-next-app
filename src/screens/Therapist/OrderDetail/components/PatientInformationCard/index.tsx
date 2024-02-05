import { Box, Card, CardContent, Typography } from "@mui/material";
import { TPatientInformationCardFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import { Person, Phone } from "@mui/icons-material";

const PatientInformationCard: TPatientInformationCardFC = ({ patient }) => {
  return (
    <Box mb={2} component={Card}>
      <CardContent>
        <Typography mb={2} fontWeight="bold" variant="h5" component="h1">
          Patient Information Detail
        </Typography>
        <FlexBox my={1} justifyContent="flex-start" gap={0.6}>
          <Person />
          <Typography variant="body1" component="h1">
            {patient?.firstName} {patient?.lastName}
          </Typography>
        </FlexBox>
        <FlexBox my={1} justifyContent="flex-start" gap={0.6}>
          <Phone />
          <Typography variant="body1" component="h1">
            {patient?.phone}
          </Typography>
        </FlexBox>
      </CardContent>
    </Box>
  );
};

export default PatientInformationCard;
