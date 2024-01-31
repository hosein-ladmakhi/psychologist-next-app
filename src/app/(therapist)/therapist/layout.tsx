import AppHeader from "@/components/AppHeader";
import { getProfile } from "@/services/auth.service";
import { ITherapist } from "@/types/therapist.model";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";
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
