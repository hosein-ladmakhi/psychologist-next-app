import AppHeader from "@/components/AppHeader";
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
    href: "/admin/patients",
    label: "بیماران",
  },
  {
    href: "/admin/orders",
    label: "رزرو ها",
  },
  {
    href: "/admin/locations",
    label: "مکان ها",
  },
  {
    href: "/admin/categories",
    label: "زمینه های تخصصی",
  },
  {
    href: "/admin/therapists",
    label: "پزشکان",
  },
  {
    href: "/admin/tickets",
    label: "تیکت ها",
  },
];

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppHeader user={{} as any} menuItems={menuItems} />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default AdminLayout;
