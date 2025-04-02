// src/app/(private)/profil/[id]/page.tsx

import { PrismaClient } from "@prisma/client";
import { Box, Typography, Avatar, Card, CardMedia } from "@mui/material";

const prisma = new PrismaClient();

async function getUserProfile(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          // Použijeme select, aby sme vybrali len potrebné polia z príspevkov,
          // pričom obrázky vyberieme zo vzťahu images.
          select: {
            id: true,
            // Ak potrebuješ vybrať ďalšie polia z Post, pridaj ich sem.
            images: {
              select: {
                id: true,
                imageUrl: true,
              },
            },
          },
        },
        profile: true,
      },
    });
  } catch (error) {
    console.error("Chyba pri načítavaní profilu:", error);
    return null;
  }
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="error">
          Profil neexistuje.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      {/* Informácie o používateľovi */}
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar src={user.image || ""} sx={{ width: 80, height: 80 }} />
        <Box ml={2}>
          <Typography variant="h5">{user.name || "Neznámy používateľ"}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      {/* Profilové informácie */}
      {user.profile && (
        <Box mb={3}>
          <Typography variant="body1">{user.profile.bio}</Typography>
        </Box>
      )}

      {/* Zoznam príspevkov používateľa */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Príspevky:
        </Typography>
        {user.posts.length > 0 ? (
          user.posts.map((post) => (
            <Card
              key={post.id}
              sx={{ mb: 2, borderRadius: 2, overflow: "hidden", boxShadow: 2 }}
            >
              {post.images.length > 0 && (
                <CardMedia
                  component="img"
                  image={post.images[0].imageUrl} // Správne načítanie URL obrázku z vzťahu images
                  alt="Obrázok príspevku"
                  sx={{ height: 300, objectFit: "cover" }}
                />
              )}
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Tento používateľ zatiaľ nemá príspevky.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
