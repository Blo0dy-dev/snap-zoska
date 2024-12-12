"use client"; // Ensures this component runs in the browser

import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react"; // Import signIn function from next-auth/react
import Link from "next/link"; // Add this import

export default function Login() {
  const theme = useTheme(); // Use the theme hook to access the current theme

  const handleLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <>
      {/* Global Styles for Full Page Background */}
      <style jsx global>{`
        html,
        body {
          height: 100%;
          margin: 0;
          background-color: ${theme.palette.mode === "dark" ? "#333" : "#f4f4f4"};
        }
      `}</style>

      {/* Flex Container to Center the Box */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* White Box Background */}
        <Box
          sx={{
            padding: "40px",
            borderRadius: "8px",
            backgroundColor: theme.palette.mode === "dark" ? "#444" : "#ffffff",
            boxShadow: 3,
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Prihlásenie
          </Typography>

          {/* Google Sign-In Button */}
          <Button
            variant="contained"
            color={theme.palette.mode === "dark" ? "secondary" : "primary"}
            onClick={() => handleLogin("google")}
            sx={{ marginTop: "20px" }}
            startIcon={<GoogleIcon />}
          >
            Prihlásiť sa cez Google
          </Button>

          {/* GitHub Sign-In Button */}
          <Button
            variant="contained"
            color={theme.palette.mode === "dark" ? "primary" : "secondary"}
            sx={{ marginTop: "10px" }}
            onClick={() => handleLogin("github")}
            startIcon={<GitHubIcon />}
          >
            Prihlásiť sa cez GitHub
          </Button>

          {/* Registration Link */}
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Nemáte účet?{" "}
            <Link
              href="/auth/registracia"
              style={{
                color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                fontStyle: "italic",
              }}
            >
              Zaregistrujte sa tu
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
