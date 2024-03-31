"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { TAppHeaderFC } from "./index.type";
import Link from "next/link";
import Button from "../Button";
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import FlexBox from "../FlexBox";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import { APP_HEADER_MENU_ITEMS } from "@/constants";

const AppHeader: TAppHeaderFC = () => {
  const user = useAuthenticatedUser();
  const router = useRouter()

  const handleLogout = () => {
    signOut({ redirect: false });
    router.replace("/auth/login")
  };

  return (
    <AppBar sx={{ marginBottom: "40px" }} position="static">
      <Toolbar>
        <FlexBox width="100%" justifyContent="center" component="ul">
          <Link className="link" href="/">
            <Typography component="h1" fontWeight="bold" variant="body1">
              {user?.firstName} {user?.lastName}
            </Typography>
          </Link>
          {APP_HEADER_MENU_ITEMS.map((item) => (
            <Link className="link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
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
