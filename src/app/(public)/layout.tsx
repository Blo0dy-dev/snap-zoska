import React from "react";

export const metadata = {
  title: "Public | Zoska",
  description: "Public layout for unauthenticated users",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Minimalistic and centered styling */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "0 16px",
        }} 
      >
        <main
          style={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {children} {/* Render public pages */}
        </main>
      </div>
    </>
  );
}