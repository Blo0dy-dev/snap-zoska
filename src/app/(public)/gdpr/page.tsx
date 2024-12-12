import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export const metadata = { title: "Stránka s gdpr informáciami | Zoska" };

export default function Gdpr() {
  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Stránka s GDPR informáciami
      </Typography>

      {/* GDPR information content goes here */}
      <Typography variant="body1">
        Tu budú uvedené informácie o ochrane osobných údajov v súlade s GDPR.
      </Typography>

      {/* Back button */}
      <Link href="/auth/registracia" passHref>
        <Button
          variant="outlined"
          sx={{ marginTop: "2rem" }}
        >
          Späť
        </Button>
      </Link>
    </div>
  );
}
