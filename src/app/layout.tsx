// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "../components/AuthProvider";
import ThemeProvider from "@/components/ThemeProvider"; // Import the ThemeProvider

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by students of SPŠE Zochova 9, Bratislava",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <ThemeProvider> {/* Wrap the entire app in ThemeProvider */}
          <AuthProvider> {/* Provides session context */}
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <main style={{ flexGrow: 1 }}>{children}</main>
            </div>
            <Navbar /> {/* Navbar is always available , caf */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
/* test*/