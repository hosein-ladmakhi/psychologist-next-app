import { FC, PropsWithChildren } from 'react';
import MuiProvider from '@/core/mui/MuiProvider';
import { figtreeFont } from '@/core/fonts/figtree-font';
import { vazirFont } from '@/core/fonts/vazir-font';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/providers/ReduxProvider';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body className={`${figtreeFont.className} ${vazirFont.className}`}>
        <ReduxProvider>
          <Toaster />
          <MuiProvider>{children}</MuiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};
export default RootLayout;
