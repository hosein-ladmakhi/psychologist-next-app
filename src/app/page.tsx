import FlexBox from "@/components/FlexBox";
import { Container, Link } from "@mui/material";
import NextLink from "next/link";
import { FC } from "react";

const HomePage: FC = async () => {
  return (
    <Container sx={{ marginBlock: "100px" }}>
      <FlexBox flexDirection="column" gap={5}>
        <Link component={NextLink} href="/admin/patients">
          Admin Page
        </Link>
        <Link component={NextLink} href="/therapist/profile">
          Therapist Page
        </Link>
      </FlexBox>
    </Container>
  );
};

export default HomePage;
