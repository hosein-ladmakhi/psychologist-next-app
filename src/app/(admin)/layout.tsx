import AppHeader from "@/components/AppHeader";
import { Container } from "@mui/material";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "سایت پزشک من | %s ",
    default: "Main",
  },
};



const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default AdminLayout;
