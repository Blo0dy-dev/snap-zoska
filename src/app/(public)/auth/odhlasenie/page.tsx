"use client"; // Ensures this component runs in the browser

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react'; // Importing the signOut method
import Box from '@mui/material/Box'; // Importing Box for layout

export default function SignOut() {
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
      <Typography variant="h5" gutterBottom>Odhlásenie</Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to home
        sx={{ marginTop: '20px' }}
      >
        Odhlásiť sa
      </Button>
    </Box>
  );
}
