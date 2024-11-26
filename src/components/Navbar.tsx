"use client"; // Ensures this component runs in the browser

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link'; // Import Link from next/link
import { useSession } from 'next-auth/react'; // Import session hook

// Define the navigation items in an array
const navItems = [
  { label: 'Domov', icon: <HomeIcon />, href: '/' },
  // { label: 'Príspevky', icon: <PostAddIcon />, href: '/prispevok' },
  // { label: 'Pridať', icon: <PostAddIcon/>, href: '/pridat'}
  { label: 'Registrácia', icon: <AppRegistrationIcon />, href: '/auth/registracia' },
  
];

export default function NavBar() {
  const [value, setValue] = React.useState(0);
  const { data: session } = useSession(); // Get session data to check if user is logged in

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* Display navigation items */}
        {navItems.map((item, index) => (
          <BottomNavigationAction 
            key={index} 
            label={item.label} 
            icon={item.icon} 
            component={Link} 
            href={item.href} // Links to the respective page
          />
        ))}

        {/* Show Prihlásenie if not logged in, otherwise Odhlásenie */}
        {!session ? (
          <BottomNavigationAction 
            label="Prihlásenie" 
            icon={<LoginIcon />} 
            component={Link} 
            href="/auth/prihlasenie" // Links to sign-in page
          />
        ) : (
          <BottomNavigationAction 
            label="Odhlásenie" 
            icon={<LogoutIcon />} 
            component={Link} 
            href="/auth/odhlasenie" // Links to sign-out page
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
