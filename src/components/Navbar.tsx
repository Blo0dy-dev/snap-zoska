// src/components/NavBar.tsx

"use client";

import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import PolicyIcon from "@mui/icons-material/Policy";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material"; // Import Avatar component
import { useThemeMode } from "@/components/ThemeProvider";

export default function NavBar() {
  const [value, setValue] = React.useState(0);
  const { data: session } = useSession();
  const { toggleTheme, mode } = useThemeMode();

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
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
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

        {/* Show profile picture if user is authenticated */}
        {session?.user?.image && (
          <BottomNavigationAction
            label="Profil"
            icon={<Avatar src={session.user.image} alt="Profile Picture" />}
            component={Link}
            href="/profil"
          />
        )}

        {!session ? (
          <BottomNavigationAction
            label="Prihlásenie"
            icon={<LoginIcon />}
            component={Link}
            href="/auth/prihlasenie"
          />
        ) : (
          <BottomNavigationAction
            label="Odhlásenie"
            icon={<LogoutIcon />}
            component={Link}
            href="/auth/odhlasenie"
          />
        )}

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
