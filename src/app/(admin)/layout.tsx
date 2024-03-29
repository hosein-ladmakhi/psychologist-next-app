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

const menuItems: { label: string; href: string }[] = [
  {
    href: "/",
    label: "ادمین ها",
  },
  {
    href: "/therapists",
    label: "پزشکان",
  },
  {
    href: "/patients",
    label: "بیماران",
  },
  {
    href: "/orders",
    label: "رزرو ها",
  },
  {
    href: "/locations",
    label: "مکان ها",
  },
  {
    href: "/categories",
    label: "زمینه های تخصصی",
  },
  {
    href: "/tickets",
    label: "تیکت ها",
  },
];

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppHeader menuItems={menuItems} />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default AdminLayout;
