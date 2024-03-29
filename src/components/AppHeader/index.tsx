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

const AppHeader: TAppHeaderFC = ({ menuItems }) => {
  const user = useAuthenticatedUser();
  const router = useRouter()

  const handleLogout = () => {
    signOut({ redirect: false });
    router.replace("/auth/login")
  };

  return (
    <AppBar sx={{ marginBottom: "40px" }} position="static">
      <Toolbar>
        <Typography component="h1" variant="body1" fontWeight={"bold"}>{user?.firstName} {user?.lastName}</Typography>
        <FlexBox justifyContent="space-between" flex={1}>
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
