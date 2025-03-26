import { PrismaClient } from "@prisma/client";
import { Box, Button, Typography, Avatar, Grid, Card, CardMedia, Divider } from "@mui/material";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({ where: { id: params.id }, select: { name: true } });
  return { title: user?.name ? `Profil | ${user.name}` : "Detail profilu" };
}

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
      <Box display="flex" alignItems="center" mb={4} gap={3}>
        <Avatar src={user.image || ""} sx={{ width: 120, height: 120, boxShadow: 3 }} />
        <Box sx={{ width: "100%" }}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography variant="h5" fontWeight="bold">{user.name || "Neznámy používateľ"}</Typography>
            <Button 
              variant="contained" 
              sx={{ textTransform: "none", fontWeight: "bold", padding: "5px 15px" }}
            >
              Sledovať
            </Button>
          </Box>

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

      <Divider sx={{ mb: 3 }} />

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
