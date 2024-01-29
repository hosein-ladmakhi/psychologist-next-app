import AppHeader from "@/components/AppHeader";
import { Container } from "@mui/material";
import { FC, PropsWithChildren } from "react";

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
    href: "/therapist/account",
    label: "Account",
  },
];

const TherapistLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppHeader menuItems={menuItems} />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default TherapistLayout;
