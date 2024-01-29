"use client";

import { AppBar, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { TAppHeaderFC } from "./index.type";
import Link from "next/link";

const AppHeader: TAppHeaderFC = ({ menuItems }) => {
  return (
    <AppBar sx={{ marginBottom: "40px" }} position="static">
      <Toolbar>
        <List sx={{ display: "flex" }}>
          {menuItems.map((item) => (
            <ListItem key={item.label}>
              <ListItemButton href={item.href} LinkComponent={Link}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
