"use client";

import { useSession } from "next-auth/react"; // To get session data
import { useRouter } from "next/navigation"; // For client-side redirection
import { useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/prihlasenie"); // Redirect to login page
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">Načítava sa</Typography>
      </div>
    );
  }

  // Prevent rendering if the user is unauthenticated until redirect occurs
  if (!session) return null;

  return <>{children}</>; // Render children if authenticated
}