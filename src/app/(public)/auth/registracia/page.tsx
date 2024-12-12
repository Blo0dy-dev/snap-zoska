"use client"; // Ensures this component runs in the browser

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react"; // Import signIn function from next-auth/react
import Link from "next/link"; // Add this import
import Checkbox from "@mui/material/Checkbox"; // Import Checkbox
import FormControlLabel from "@mui/material/FormControlLabel"; // Import FormControlLabel
import Alert from "@mui/material/Alert"; // Import Alert

export default function Register() {
  const theme = useTheme(); // Use the theme hook to access the current theme
  const [isChecked, setIsChecked] = useState(false); // State to track if the checkbox is checked
  const [showError, setShowError] = useState(false); // State to control the error message visibility

  const handleRegister = (provider: string) => {
    if (!isChecked) {
      setShowError(true); // Show error message if the checkbox is not checked
      return;
    }
    setShowError(false); // Hide error message if checkbox is checked
    signIn(provider, { callbackUrl: "/" });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update state when checkbox is toggled
    setShowError(false); // Hide error message when checkbox is checked
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
            Registrácia
          </Typography>

          {/* Show Error Alert if checkbox is not checked */}
          {showError && (
            <Alert severity="error" sx={{ marginBottom: "20px", width: "100%" }}>
              Musíte súhlasiť s podmienkami a GDPR pred registráciou!
            </Alert>
          )}

          {/* Google Sign-Up Button */}
          <Button
            variant="contained"
            color={theme.palette.mode === "dark" ? "secondary" : "primary"}
            onClick={() => handleRegister("google")}
            sx={{ marginTop: "20px" }}
            startIcon={<GoogleIcon />}
          >
            Registrujte sa cez Google
          </Button>

          {/* GitHub Sign-Up Button */}
          <Button
            variant="contained"
            color={theme.palette.mode === "dark" ? "primary" : "secondary"}
            sx={{ marginTop: "10px" }}
            onClick={() => handleRegister("github")}
            startIcon={<GitHubIcon />}
          >
            Registrujte sa cez GitHub
          </Button>

          {/* GDPR Agreement Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                Súhlasím s{" "}
                <Link
                  href="/gdpr"
                  style={{
                    color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                    fontStyle: "italic",
                  }}
                >
                  GDPR
                </Link>{" "}
                a{" "}
                <Link
                  href="/podmienky"
                  style={{
                    color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                    fontStyle: "italic",
                  }}
                >
                  Podmienkami
                </Link>
              </Typography>
            }
            sx={{ marginTop: "20px" }}
          />

          {/* Login Link */}
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Už máte účet?{" "}
            <Link
              href="/auth/prihlasenie"
              style={{
                color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                fontStyle: "italic",
              }}
            >
              Prihláste sa tu
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
