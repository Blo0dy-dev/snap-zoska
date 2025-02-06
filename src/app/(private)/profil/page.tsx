"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Avatar, Box, Divider } from "@mui/material";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/prihlasenie");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Načítava sa...</Typography>
      </Box>
    );
  }

  return (
    session && (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          paddingY: "2rem",
        }}
      >
        {/* Profile Picture */}
        <Avatar
          src={session.user?.image || ""}
          alt={session.user?.name || "Profilový obrázok"}
          sx={{ width: 120, height: 120, marginBottom: "1rem" }}
        />

        {/* User Name */}
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
          {session.user?.name}
        </Typography>

        <Divider sx={{ width: "100%", marginY: "1.5rem" }} />

        {/* Posts Section */}
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Príspevky
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Nemáte žiadne príspevky.
        </Typography>
      </Container>
    )
  );
}
