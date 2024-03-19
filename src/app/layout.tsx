import "./globals.css";

import { FC, PropsWithChildren } from "react";
import { figtreeFont } from "@/core/fonts/figtree-font";
import { vazirFont } from "@/core/fonts/vazir-font";
import { Toaster } from "react-hot-toast";
import RouteLoadingProvider from "@/providers/RouteLoadingProvider";
import LocalizationPickerProvider from "@/providers/LocalizationPickerProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import MuiThemeProvider from "@/providers/MuiThemeProvider";

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  return (
    <html>
      <body className={`${figtreeFont.className} ${vazirFont.className}`}>
        <RouteLoadingProvider>
          <LocalizationPickerProvider>
            <NextAuthProvider session={session}>
              <Toaster />
              <MuiThemeProvider>{children}</MuiThemeProvider>
            </NextAuthProvider>
          </LocalizationPickerProvider>
        </RouteLoadingProvider>
      </body>
    </html>
  );
};
export default RootLayout;
