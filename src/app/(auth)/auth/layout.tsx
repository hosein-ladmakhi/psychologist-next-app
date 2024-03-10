import FlexBox from "@/components/FlexBox";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FlexBox width="100%" height="100%" position="absolute" top={0} left={0}>
      <Container>
        <Grid borderRadius="10px" bgcolor="#27313b" container spacing={5}>
          <Grid item md={5}>
            <FlexBox height="100%" flexDirection="column">
              {children}
            </FlexBox>
          </Grid>
          <Grid item md={7}>
            <FlexBox minHeight={600} position="relative" width="100%">
              <Image src="/svgs/auth.svg" fill alt="auth image" />
            </FlexBox>
          </Grid>
        </Grid>
      </Container>
    </FlexBox>
  );
};

export default AuthLayout;
