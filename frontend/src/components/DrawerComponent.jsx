import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Cart from './Cart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function DrawerComponent({ open, toggleDrawer }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const DrawerList = (
    <Box
      sx={{ width: isMobile ? '100%' : 690 }}
      role="presentation"
      onClick={toggleDrawer(true)}
    >
      <Cart />
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      anchor={isMobile ? 'bottom' : 'left'}
    >
      {DrawerList}
    </Drawer>
  );
}
