"use client";

import { AppBar, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { TAppHeaderFC } from "./index.type";
import Link from "next/link";
import Button from "../Button";
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";

const AppHeader: TAppHeaderFC = ({ menuItems, user }) => {
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
  };
  return (
    <AppBar sx={{ marginBottom: "40px" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" component="h1" fontWeight="bold">
          {user?.firstName} {user?.lastName}
        </Typography>
        <List sx={{ display: "flex" }}>
          {menuItems.map((item) => (
            <ListItem key={item.label}>
              <ListItemButton href={item.href} LinkComponent={Link}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={handleLogout} color="secondary">
          <Logout sx={{ marginInlineEnd: "5px" }} fontSize="small" />
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
