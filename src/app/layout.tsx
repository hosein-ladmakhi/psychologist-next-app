import "./globals.css";

import { FC, PropsWithChildren } from "react";
import MuiProvider from "@/core/mui/MuiProvider";
import { figtreeFont } from "@/core/fonts/figtree-font";
import { vazirFont } from "@/core/fonts/vazir-font";
import { Toaster } from "react-hot-toast";
import RouteLoadingProvider from "@/providers/RouteLoadingProvider";
import LocalizationPickerProvider from "@/providers/LocalizationPickerProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  return (
    <html>
      <body className={`${figtreeFont.className} ${vazirFont.className}`}>
        <RouteLoadingProvider>
          <LocalizationPickerProvider>
            <NextAuthProvider session={session}>
              <Toaster />
              <MuiProvider>{children}</MuiProvider>
            </NextAuthProvider>
          </LocalizationPickerProvider>
        </RouteLoadingProvider>
      </body>
    </html>
  );
};
export default RootLayout;
