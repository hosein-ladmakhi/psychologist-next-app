import { AppBar, Container, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "Psychologist | %s Page",
    default: "Main",
  },
};

const menusItem: { label: string; href: string }[] = [
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
];

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar sx={{ marginBottom: "40px" }} position="static">
        <Toolbar>
          <List sx={{ display: "flex" }}>
            {menusItem.map((item) => (
              <ListItem key={item.label}>
                <ListItemButton href={item.href} LinkComponent={Link}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default AdminLayout;
