import AppHeader from "@/components/AppHeader";
import { getProfile } from "@/services/auth.service";
import { IPatient } from "@/types/patient.model";
import { Container } from "@mui/material";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "Psychologist | %s Page",
    default: "Main",
  },
};

const menuItems: { label: string; href: string }[] = [
  {
    href: "/patient/profile",
    label: "Profile",
  },
  {
    href: "/patient/my-orders",
    label: "Reservations",
  },
  {
    href: "/patient/my-tickets",
    label: "Tickets",
  },
];

const PatientLayout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await getProfile<IPatient>();
  return (
    <>
      <AppHeader user={user} menuItems={menuItems} />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default PatientLayout;
