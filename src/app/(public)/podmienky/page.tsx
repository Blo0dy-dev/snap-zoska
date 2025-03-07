import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

export const metadata = { title: "Podmienky Používateľa | ZoškaSnap" };

export default function TermsConditions() {
  return (
    <Container sx={{ marginTop: "2rem", paddingBottom: "6rem", maxWidth: "800px" }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        Podmienky Používateľa
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        Vitajte na ZoškaSnap. Používaním tejto platformy súhlasíte s nasledujúcimi podmienkami:
      </Typography>

      <Typography variant="h6" component="h2" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
        1. Používateľské konto
      </Typography>
      <Typography variant="body1">
        - Pri registrácii musíte poskytnúť presné a aktuálne informácie. <br />
        - Ste zodpovední za ochranu svojho hesla a účtu.
      </Typography>

      <Typography variant="h6" component="h2" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
        2. Obsah používateľov
      </Typography>
      <Typography variant="body1">
        - Používateľ nesmie pridávať obsah, ktorý je nezákonný, urážlivý, alebo porušuje práva iných. <br />
        - ZoškaSnap si vyhradzuje právo odstrániť nevhodný obsah.
      </Typography>

      <Typography variant="h6" component="h2" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
        3. Používanie platformy
      </Typography>
      <Typography variant="body1">
        - ZoškaSnap sa musí používať výhradne na legálne účely. <br />
        - Porušenie týchto podmienok môže viesť k zablokovaniu účtu.
      </Typography>

      <Typography variant="h6" component="h2" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
        4. Ochrana osobných údajov
      </Typography>
      <Typography variant="body1">
        - ZoškaSnap zhromažďuje a spracúva údaje v súlade s našimi zásadami ochrany osobných údajov. <br />
        - Údaje používateľov nebudú predávané tretím stranám bez povolenia.
      </Typography>

      <Typography variant="h6" component="h2" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
        5. Zodpovednosť
      </Typography>
      <Typography variant="body1">
        - ZoškaSnap nezodpovedá za straty spôsobené nesprávnym používaním platformy. <br />
        - Používateľ je zodpovedný za svoje vlastné aktivity.
      </Typography>

      <Typography variant="h6" component="h2" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
        6. Zmeny podmienok
      </Typography>
      <Typography variant="body1">
        - ZoškaSnap si vyhradzuje právo kedykoľvek upraviť tieto podmienky. <br />
        - Používatelia budú informovaní o akýchkoľvek zmenách.
      </Typography>

      <Typography variant="body2" sx={{ marginTop: "2rem" }}>
        Dátum poslednej aktualizácie: 12. decembra 2024
      </Typography>

      <Link href="/auth/registracia" passHref>
        <Button
          variant="contained"
          sx={{
            marginTop: "2rem",
            backgroundColor: "#d32f2f", // Red button color
            color: "#fff",              // White text
            padding: "12px 24px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#b71c1c", // Darker red on hover
            },
          }}
        >
          Späť
        </Button>
      </Link>
    </Container>
  );
}
