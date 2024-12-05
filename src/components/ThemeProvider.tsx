// src/components/ThemeProvider.tsx
"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: "light",
});

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to light mode if nothing is saved in localStorage
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Read theme from localStorage when the component is mounted
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setMode(savedTheme as "light" | "dark");
    } else {
      // Set default theme based on the system preference
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setMode(systemPreference);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  // Define the MUI theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#ff0000", // Red color
          },
        },
        components: {
          MuiBottomNavigationAction: {
            styleOverrides: {
              root: {
                "&.Mui-selected": {
                  color: "#ff0000", // Red color when selected
                },
              },
            },
          },
        },
      }),
    [mode] // Recreate the theme when the mode changes
  );

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;
