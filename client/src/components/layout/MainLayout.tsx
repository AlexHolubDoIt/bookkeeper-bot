import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RobotIcon from "@mui/icons-material/SmartToy";
import TaskIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTES } from "@/constants";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: ROUTES.DASHBOARD, label: "Dashboard", icon: <DashboardIcon /> },
    {
      path: ROUTES.BOT_MANAGEMENT,
      label: "Bot Management",
      icon: <RobotIcon />,
    },
    {
      path: ROUTES.TASK_ANALYTICS,
      label: "Task Analytics",
      icon: <TaskIcon />,
    },
  ];

  const drawer = (
    <Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "primary.main", textDecoration: "none" }}
        >
          BookkeeperBot
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              color: isActive(item.path) ? "primary.main" : "text.primary",
              bgcolor: isActive(item.path) ? "primary.lighter" : "transparent",
              "&:hover": {
                bgcolor: isActive(item.path)
                  ? "primary.lighter"
                  : "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{ color: isActive(item.path) ? "primary.main" : "inherit" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "background.paper",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}
          >
            BookkeeperBot
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color={isActive(item.path) ? "primary" : "inherit"}
                  variant={isActive(item.path) ? "contained" : "text"}
                  startIcon={item.icon}
                  sx={{ mx: 0.5 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` },
          ml: { md: "240px" },
          mt: "64px",
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
