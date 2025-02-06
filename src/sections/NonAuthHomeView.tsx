"use client";

import { Container, Typography, CssBaseline, GlobalStyles, Button, Stack, useTheme } from "@mui/material";

export default function NonAuthHomeView() {
  const theme = useTheme(); // Access the current theme (light/dark)

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '@import': "url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap')",
          body: { fontFamily: "'Inter', sans-serif" },
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 3,
          color: theme.palette.text.primary,  // Dynamic text color
          transition: "color 0.3s ease",      // Smooth transition for text color
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            marginBottom: 2,
            letterSpacing: "0.5px",
            color: theme.palette.primary.main,
          }}
        >
          Vitajte!
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            marginBottom: 2,
            fontWeight: 500,
          }}
        >
          Domovská stránka - Neprihlásený používateľ
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: "500px",
            lineHeight: 1.8,
            color: theme.palette.text.secondary,
            marginBottom: 3,
          }}
        >
          Registrujte sa, aby ste mohli pridávať príspevky a zobrazovať profil.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            href="/auth/registracia"
            sx={{
              backgroundColor: "red", // Základná červená farba
              color: "white",
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
              transition: "background-color 0.3s ease", // Plynulý prechod
              "&:hover": {
                backgroundColor: "darkred", // Tmavšia červená pri hoveri
              },
            }}
          >
            Zaregistrujte sa
          </Button>

          <Button
            variant="outlined"
            href="/auth/prihlasenie"
            sx={{
              color: "red",
              borderColor: "red",
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "darkred", // Tmavšia červená pri hoveri
                color: "white", // Biele písmo na tmavom pozadí
                borderColor: "darkred",
              },
            }}
          >
            Prihlásiť sa
          </Button>
        </Stack>
      </Container>
    </>
  );
}
