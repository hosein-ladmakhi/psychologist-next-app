import AppHeader from "@/components/AppHeader";
import { getProfile } from "@/services/auth.service";
import { ITherapist } from "@/types/therapist.model";
import { Container } from "@mui/material";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "Therapist | %s Page",
    default: "Main",
  },
};

const menuItems: { label: string; href: string }[] = [
  {
    href: "/therapist/orders",
    label: "Orders",
  },
  {
    href: "/therapist/profile",
    label: "Profile",
  },
  {
    href: "/therapist/schedules",
    label: "Schedules",
  },
  {
    href: "/therapist/off-day",
    label: "DayOff",
  },
  {
    href: "/therapist/dashboard",
    label: "Dashboard",
  },
];

const TherapistLayout: FC<PropsWithChildren> = async ({ children }) => {
  const user = await getProfile<ITherapist>();
  return (
    <>
      <AppHeader user={user} menuItems={menuItems} />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default TherapistLayout;
