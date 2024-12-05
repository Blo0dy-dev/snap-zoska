"use client"; // Ensures this component runs in the browser

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react'; // Importing the signIn method
import Box from '@mui/material/Box'; // Importing Box for layout
import GoogleIcon from '@mui/icons-material/Google'; // Importing Google icon
import GitHubIcon from '@mui/icons-material/GitHub'; // Importing GitHub icon
import Link from 'next/link'; // Importing Link component for navigation
import { useTheme } from '@mui/material/styles'; // Importing theme hook

export default function Login() {
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
          <Typography variant="h5" gutterBottom>Prihlásenie</Typography>

          {/* Google Sign In Button with Lime Google Logo */}
          <Button 
            variant="contained" 
            color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} // Button color based on theme
            onClick={() => signIn('google', { callbackUrl: '/' })} // Sign in via Google
            sx={{ marginTop: '20px' }}
            startIcon={<GoogleIcon sx={{ color: '#FFFFF' }} />} // Lime color for Google icon
          >
            Prihlásiť sa cez Google
          </Button>

          {/* GitHub Sign In Button with GitHub Logo */}
          <Button 
            variant="contained" 
            color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'} // Button color based on theme
            sx={{ marginTop: '10px' }}
            startIcon={<GitHubIcon sx={{ color: '#FFFFF' }} />} // GitHub logo with black color
          >
            Prihlásiť sa cez GitHub
          </Button>

          {/* Registration Link */}
          <Typography variant="body2" sx={{ marginTop: '20px' }}>
            Don't have an account?{' '}
            <Link href="/auth/registracia" style={{ color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2' }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
