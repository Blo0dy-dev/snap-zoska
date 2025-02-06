import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export const metadata = { title: "Stránka s GDPR informáciami | Zoška" };

export default function Gdpr() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", paddingBottom: "6rem" }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        Ochrana osobných údajov (GDPR)
      </Typography>

      <Typography variant="body1" paragraph>
        Vaša dôvera je pre nás dôležitá. Preto sa zaväzujeme chrániť vaše osobné údaje v súlade s 
        <strong> Nariadením (EÚ) 2016/679</strong> o ochrane osobných údajov (GDPR).
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>
        1. Kto je správcom vašich údajov?
      </Typography>
      <Typography variant="body1" paragraph>
        Správcom osobných údajov je <strong>ZoškaSnap</strong>, zodpovedný za spracovanie a ochranu vašich údajov.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>
        2. Aké údaje zhromažďujeme?
      </Typography>
      <Typography variant="body1" paragraph>
        Môžeme zhromažďovať nasledovné údaje:
        <ul>
          <li>Meno a priezvisko</li>
          <li>E-mailová adresa</li>
          <li>IP adresa a technické údaje o zariadení</li>
          <li>Údaje z formulárov alebo registrácie</li>
        </ul>
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>
        3. Na aký účel používame vaše údaje?
      </Typography>
      <Typography variant="body1" paragraph>
        Vaše údaje používame na:
        <ul>
          <li>Poskytovanie prístupu k našim službám</li>
          <li>Zlepšovanie funkčnosti webovej stránky</li>
          <li>Marketingové účely (len so súhlasom)</li>
          <li>Bezpečnostné účely</li>
        </ul>
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>
        4. Ako chránime vaše údaje?
      </Typography>
      <Typography variant="body1" paragraph>
        Používame moderné technické a organizačné opatrenia na ochranu vašich údajov pred neoprávneným prístupom, stratou alebo zneužitím.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>
        5. Aké máte práva?
      </Typography>
      <Typography variant="body1" paragraph>
        Máte právo na:
        <ul>
          <li>Prístup k svojim osobným údajom</li>
          <li>Opravu alebo vymazanie údajov</li>
          <li>Obmedzenie spracovania</li>
          <li>Právo namietať voči spracovaniu</li>
          <li>Právo na prenositeľnosť údajov</li>
          <li>Odvolanie súhlasu kedykoľvek</li>
        </ul>
      </Typography>

      <Typography variant="h5" sx={{ marginTop: "1.5rem", fontWeight: "bold" }}>
        6. Kontakt
      </Typography>
      <Typography variant="body1" paragraph>
        V prípade akýchkoľvek otázok ohľadom ochrany osobných údajov nás môžete kontaktovať na:
        <br />
        <strong>E-mail:</strong> gdpr@zoskasnap.sk
      </Typography>

      {/* Back Button */}
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
    </div>
  );
}
