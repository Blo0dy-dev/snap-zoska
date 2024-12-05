"use client"; // Ensures this component runs in the browser

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react'; // Importing the signOut method
import Box from '@mui/material/Box'; // Importing Box for layout
import { useTheme } from '@mui/material/styles'; // Importing theme hook

export default function SignOut() {
  const theme = useTheme(); // Use the theme hook to access the current theme

  return (
    <>
      {/* Global Styles for Full Page Background */}
      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          background-color: ${theme.palette.mode === 'dark' ? '#333' : '#f4f4f4'}; /* Dynamically set the background */
        }
      `}</style>

      {/* Flex Container to Center the Box */}
      <Box
        sx={{
          minHeight: '100vh', // Full height of the viewport
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* White Box Background */}
        <Box
          sx={{
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#ffffff', // Box background color
            boxShadow: 3,
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>Odhlásenie</Typography>

          {/* Sign Out Button */}
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to home
            sx={{ marginTop: '20px' }}
          >
            Odhlásiť sa
          </Button>
        </Box>
      </Box>
    </>
  );
}
