import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link"; // Import Link from MUI

export const metadata = { title: "O mne | ZoškaSnap" };

export default function About() {
  return (
    <Container sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
      {/* O-mne Text at the top left */}
      <Typography variant="h3" component="h1">
        O-mne
      </Typography>

      {/* Moja Zošová Link */}
      <Typography variant="body1" sx={{ marginTop: "20px" }}>
        <Link href="https://moja.zochova.sk/" color="primary">
          Moja Zochova
        </Link>
      </Typography>
    </Container>
  );
}
