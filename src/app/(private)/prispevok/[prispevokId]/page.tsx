// src/app/prispevok/[id]/page.tsx

import { PrismaClient } from '@prisma/client';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, CardMedia, Divider } from '@mui/material';

const prisma = new PrismaClient();

export const metadata = { title: 'Detail konkrétneho príspevku | Zoska' };

async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,  // Include user details (optional)
      },
    });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostDetail({ params }: { params: { prispevokId: string } }) {
  const post = await getPostById(params.prispevokId);

  if (!post) {
    return (
      <Typography variant="h5" color="error" sx={{ textAlign: 'center', marginTop: 4 }}>
        Post not found.
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ padding: 2, backgroundColor: 'transparent' }} // Optional styling
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        {post.caption}
      </Typography>
      
      {post.imageUrl && (
        <CardMedia
          component="img"
          height="250"
          image={post.imageUrl}
          alt={post.caption || "Post Image"}
          sx={{
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: 2,
          }}
        />
      )}

      <Card sx={{ width: '100%', maxWidth: 800, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {post.user?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {post.caption}
          </Typography>
        </CardContent>
      </Card>

      <Divider />
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
        {/* Optionally add additional content like comments, etc. */}
      </Typography>
    </Box>
  );
}
