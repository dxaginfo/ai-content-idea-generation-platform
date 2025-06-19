import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  LightbulbOutlined,
  BookmarkBorder,
  CalendarMonth,
  Insights,
  Settings,
} from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      text: 'Generate Ideas',
      icon: <LightbulbOutlined />,
      path: '/idea-generator',
    },
    {
      text: 'Saved Ideas',
      icon: <BookmarkBorder />,
      path: '/saved-ideas',
    },
    {
      text: 'Content Calendar',
      icon: <CalendarMonth />,
      path: '/calendar',
    },
    {
      text: 'Analytics',
      icon: <Insights />,
      path: '/analytics',
    },
    {
      text: 'Settings',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  const drawer = (
    <>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.path}
              sx={{
                backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? theme.palette.primary.main : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: isActive ? theme.palette.primary.main : 'inherit',
                    fontWeight: isActive ? 'bold' : 'normal',
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );

  if (isMobile) {
    return null; // Don't render sidebar on mobile, it's in the drawer menu
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: 64, // AppBar height
          height: 'calc(100% - 64px)',
        },
      }}
      open
    >
      <Box sx={{ overflow: 'auto' }}>{drawer}</Box>
    </Drawer>
  );
};

export default Sidebar;
