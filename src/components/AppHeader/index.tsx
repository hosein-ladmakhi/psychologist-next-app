"use client";

import { AppBar, Toolbar } from "@mui/material";
import { TAppHeaderFC } from "./index.type";
import Link from "next/link";
import Button from "../Button";
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import FlexBox from "../FlexBox";

const AppHeader: TAppHeaderFC = ({ menuItems, user }) => {
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  return (
    <AppBar sx={{ marginBottom: "40px" }} position="static">
      <Toolbar>
        <FlexBox justifyContent="space-between" width="100%">
          <FlexBox component="ul">
            {menuItems.map((item) => (
              <Link className="link" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </FlexBox>
          <Button onClick={handleLogout} color="secondary">
            <Logout sx={{ marginInlineEnd: "5px" }} fontSize="small" />
            خروج از حساب کاربری
          </Button>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
