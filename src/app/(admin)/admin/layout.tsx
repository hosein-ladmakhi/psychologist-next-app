import {
  AppBar,
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

const menusItem: { label: string; href: string }[] = [
  {
    href: '/admin/patients',
    label: 'Patients',
  },
  {
    href: '/admin/categories',
    label: 'Categories',
  },
  {
    href: '/admin/therapists',
    label: 'Therapists',
  },
];

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar sx={{ marginBottom: '40px' }} position="static">
        <Toolbar>
          <List sx={{ display: 'flex' }}>
            {menusItem.map((item) => (
              <ListItem key={item.label}>
                <ListItemButton href={item.href} LinkComponent={Link}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </>
  );
};

export default AdminLayout;
