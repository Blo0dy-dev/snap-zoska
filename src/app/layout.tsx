// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";

// Global metadata for the entire site
export const metadata: Metadata = {
  title: "SnapZoška", // You can customize this
  description: "Created by students of SPŠE Zochova 9, Bratislava", // Customize this as well
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider> {/* Provides session context for the entire app */}
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <main style={{ flexGrow: 1 }}>
              {children} {/* Renders the specific page content */}
            </main>
          </div>
          <Navbar /> {/* Navbar available on all pages */}
        </AuthProvider>
      </body>
    </html>
  );
}

