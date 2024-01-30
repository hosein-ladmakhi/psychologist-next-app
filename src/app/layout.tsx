import "./globals.css";

import { FC, PropsWithChildren } from "react";
import MuiProvider from "@/core/mui/MuiProvider";
import { figtreeFont } from "@/core/fonts/figtree-font";
import { vazirFont } from "@/core/fonts/vazir-font";
import { Toaster } from "react-hot-toast";
import RouteLoadingProvider from "@/providers/RouteLoadingProvider";
import LocalizationPickerProvider from "@/providers/LocalizationPickerProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body className={`${figtreeFont.className} ${vazirFont.className}`}>
        <RouteLoadingProvider>
          <LocalizationPickerProvider>
            <NextAuthProvider>
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
