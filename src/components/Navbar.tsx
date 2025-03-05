"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useThemeMode } from "@/components/ThemeProvider";
import Link from "next/link";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Typography,
  Paper
} from "@mui/material";
import {
  Home as HomeIcon,
  Login as LoginIcon,
  AppRegistration as AppRegistrationIcon,
  Logout as LogoutIcon,
  Policy as PolicyIcon,
  Search as SearchIcon,
  AddCircle as AddCircleIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon
} from "@mui/icons-material";

export default function NavBar() {
  const [value, setValue] = useState(0);
  const { data: session } = useSession();
  const { toggleTheme, mode } = useThemeMode();

  // Profilové menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const unauthNavItems = [
    { label: "Domov", icon: <HomeIcon />, href: "/" },
    { label: "O mne", icon: <PolicyIcon />, href: "/o-mne" },
    { label: "Registrácia", icon: <AppRegistrationIcon />, href: "/auth/registracia" },
  ];

  const authNavItems = [
    { label: "Domov", icon: <HomeIcon />, href: "/prispevok" },
    { label: "Hľadanie", icon: <SearchIcon />, href: "/hladanie" },
    { label: "Pridať", icon: <AddCircleIcon />, href: "/pridat" },
  ];

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        {(session ? authNavItems : unauthNavItems).map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            icon={item.icon}
            component={Link}
            href={item.href}
          />
        ))}

        {/* Profilové menu pre prihláseného používateľa */}
        {session?.user?.image && (
          <>
            <BottomNavigationAction
              label="Profil"
              icon={<Avatar src={session.user.image} alt="Profilový obrázok" />}
              onClick={handleMenuOpen}
            />

            {/* Štýlové menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 5,
                sx: {
                  borderRadius: 2,
                  overflow: "hidden",
                  minWidth: 180,
                  paddingY: 1,
                },
              }}
            >
              <Paper elevation={0} sx={{ paddingX: 2, paddingY: 1, textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">{session.user.name}</Typography>
                <Typography variant="body2" color="textSecondary">{session.user.email}</Typography>
              </Paper>
              <MenuItem
                component={Link}
                href="/profil"
                onClick={handleMenuClose}
                sx={{ paddingY: 1, "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  handleMenuClose();
                }}
                sx={{ paddingY: 1, "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Odhlásiť sa
              </MenuItem>
            </Menu>
          </>
        )}

        {!session ? (
          <BottomNavigationAction
            label="Prihlásenie"
            icon={<LoginIcon />}
            component={Link}
            href="/auth/prihlasenie"
          />
        ) : null}

        {/* Dark mode toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: "absolute",
            right: 16,
            bottom: 16,
            color: mode === "dark" ? "#ffffff" : "#000000",
          }}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </BottomNavigation>
    </Box>
  );
}
