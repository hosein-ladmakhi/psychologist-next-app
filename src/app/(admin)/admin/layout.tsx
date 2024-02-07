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
    label: "Patients",
  },
  {
    href: "/admin/orders",
    label: "Orders",
  },
  {
    href: "/admin/locations",
    label: "Locations",
  },
  {
    href: "/admin/categories",
    label: "Categories",
  },
  {
    href: "/admin/therapists",
    label: "Therapists",
  },
  {
    href: "/admin/tickets",
    label: "Tickets",
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
