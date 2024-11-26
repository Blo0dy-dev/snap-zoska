// src/app/auth/prihlasenie/page.tsx

"use client"; // Ensures this component runs in the browser

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react'; // Importing the signIn method
import Box from '@mui/material/Box'; // Importing Box for layout

export default function SignIn() {
  return (
    <Box
      sx={{
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>Prihlásenie cez Google OAuth</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => signIn('google', { callbackUrl: '/' })} // Sign in via Google
        sx={{ marginTop: '20px' }}
      >
        Prihlásiť sa cez Google
      </Button>
    </Box>
  );
}
