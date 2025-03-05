import { PrismaClient } from "@prisma/client";
import { Box, Button, Typography, Avatar, Grid, Card, CardMedia, Divider } from "@mui/material";

const prisma = new PrismaClient();

export const metadata = { title: "Detail profilu | Zoska" };

// Server-side fetch používateľa a jeho príspevkov
async function getUserProfile(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        posts: {
          select: {
            id: true,
            imageUrl: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Chyba pri načítavaní profilu:", error);
    return null;
  }
}

export default async function ProfileDetail({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5">Používateľ neexistuje</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3 }}>
      {/* Profilová hlavička */}
      <Box display="flex" alignItems="center" mb={4} gap={3}>
        <Avatar 
          src={user.image || ""} 
          sx={{ width: 120, height: 120, boxShadow: 3 }} 
        />
        <Box sx={{ width: "100%" }}>
          {/* Meno a Follow tlačidlo vedľa seba */}
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography variant="h5" fontWeight="bold">{user.name || "Neznámy používateľ"}</Typography>
            <Button 
              variant="contained" 
              sx={{ textTransform: "none", fontWeight: "bold", padding: "5px 15px" }}
            >
              Sledovať
            </Button>
          </Box>

          {/* Followers & Following zarovnané na začiatok */}
          <Box display="flex" gap={3}>
            <Typography variant="body1" fontWeight="bold">
              123 <span style={{ color: "gray", fontWeight: "normal" }}>Followers</span>
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              89 <span style={{ color: "gray", fontWeight: "normal" }}>Following</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} /> {/* Čistý oddelovač medzi profilom a príspevkami */}

      {/* Grid príspevkov */}
      <Typography variant="h6" gutterBottom fontWeight="bold">Príspevky</Typography>
      {user.posts.length > 0 ? (
        <Grid container spacing={2}>
          {user.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  image={post.imageUrl}
                  alt="Príspevok"
                  sx={{ width: "100%", height: 250, objectFit: "cover" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary">Žiadne príspevky</Typography>
      )}
    </Box>
  );
}
