import { PrismaClient } from "@prisma/client";
import { Box, Typography, Card, CardMedia, Avatar } from "@mui/material";

const prisma = new PrismaClient();

async function getPostById(prispevokId: string) {
  try {
    return await prisma.post.findUnique({
      where: { id: prispevokId },
      include: {
        user: true,        // autor príspevku
        images: true       // obrázky z PostImage tabuľky
      },
    });
  } catch (error) {
    console.error("Chyba pri načítavaní príspevku:", error);
    return null;
  }
}

export default async function PostDetail({ params }: { params: { prispevokId: string } }) {
  const post = await getPostById(params.prispevokId);

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" color="error">Príspevok neexistuje.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 3 }}>
      {/* Informácie o autorovi */}
      <Box display="flex" alignItems="center" mb={2} gap={2}>
        <Avatar src={post.user.image || ""} sx={{ width: 50, height: 50 }} />
        <Typography variant="h6">{post.user.name || "Neznámy používateľ"}</Typography>
      </Box>

      {/* Obrázky príspevku */}
      {post.images.length > 0 && post.images.map((img, index) => (
        <Card
          key={img.id}
          sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 2, mb: 2 }}
        >
          <CardMedia
            component="img"
            image={img.imageUrl}
            alt={`Obrázok ${index + 1}`}
            sx={{ width: "100%", height: 500, objectFit: "cover" }}
          />
        </Card>
      ))}

      {/* Textový obsah */}
      <Box mt={2}>
        <Typography variant="body1" fontWeight="bold">{post.user.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" mt={1}>{post.caption}</Typography>
      </Box>
    </Box>
  );
}
