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
      {/* Adjust layout to align to the right */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Align to top
          alignItems: "flex-start",      // Align to the left
          minHeight: "100vh",
          padding: "0 16px",
        }}
      >
        <main
          style={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "left",  // Align text to the left
            marginTop: "20px",
            marginLeft: "auto", // Move to the right
            marginRight: "auto", // Keep it centered within the available space
          }}
        >
          {children} {/* Render public pages */}
        </main>
      </div>
    </>
  );
}
