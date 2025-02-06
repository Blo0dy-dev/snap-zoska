import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Stack, Divider } from "@mui/material";

export const metadata = { title: "O mne | ZoškaSnap" };

export default function About() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingY: 4,
        paddingX: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          color: "primary.main",
          letterSpacing: "1px",
        }}
      >
        O mne
      </Typography>

      <Divider sx={{ width: "60%", marginY: 2 }} />

      {/* About Me Description */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: "500px",
          color: "text.secondary",
          marginBottom: 3,
          lineHeight: 1.6,
        }}
      >
        Ahoj! Toto je stránka SnapZoška a spravil ju študent zo SPŠE Zochova. Zaujímam sa o
        technológie, dizajn a sociálne médiá. Na tejto stránke zdieľam svoje
        projekty a odkazy na platformy, kde môžete sledovať moju prácu.
      </Typography>

      {/* Links */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Link
          href="https://moja.zochova.sk/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "none",
            color: "#fff", // White text
            padding: "12px",
            borderRadius: "8px",
            transition: "all 0.3s",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Moja Zochova
        </Link>

        <Link
          href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fspsezochova%2F%3Flocale%3Dsk_SK"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "none",
            color: "#fff", // White text
            padding: "12px",
            borderRadius: "8px",
            transition: "all 0.3s",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Facebook
        </Link>

        <Link
          href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fspsezochova%2F&is_from_rle"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "none",
            color: "#fff", // White text
            padding: "12px",
            borderRadius: "8px",
            transition: "all 0.3s",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Instagram
        </Link>
      </Stack>
    </Container>
  );
}
