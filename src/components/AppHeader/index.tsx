"use client";

import { AppBar, Avatar, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { TAppHeaderFC } from "./index.type";
import Link from "next/link";
import Button from "../Button";
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import FlexBox from "../FlexBox";
import { API_URL } from "@/constants";
import { ITherapist } from "@/types/therapist.model";

const AppHeader: TAppHeaderFC = ({ menuItems, user }) => {
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
  };
  const userProfileImage = (user as ITherapist)?.image;
  return (
    <AppBar sx={{ marginBottom: "40px" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <FlexBox>
          {userProfileImage && <Avatar src={`${API_URL}${userProfileImage}`} sx={{ height: "50px", width: "50px", marginRight: "10px" }} />}
          <Typography variant="h6" component="h1" fontWeight="bold">
            {user?.firstName} {user?.lastName}
          </Typography>
        </FlexBox>
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
