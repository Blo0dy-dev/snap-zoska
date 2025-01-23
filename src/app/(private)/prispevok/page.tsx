// src/app/(private)/prispevok/page.tsx

import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, CardMedia, Divider } from '@mui/material';

const prisma = new PrismaClient();

export const metadata = { title: 'Zoznam príspevkov | Zoska' };

// Server-side fetch
async function getPosts() {
  try {
    // Fetch posts from Prisma
    return await prisma.post.findMany({
      include: {
        user: true,  // Include user details (optional)
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function PostList() {
  const posts = await getPosts();  // Fetch posts on the server

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"   // Centering the posts horizontally
      justifyContent="center" // Centering the posts vertically
      minHeight="100vh"  // Full height of the viewport
      sx={{ padding: 2, backgroundColor: 'transparent' }} // Optional styling
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        Zoznam príspevkov
      </Typography>
      {posts.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={3} width="100%" maxWidth={800}> {/* Adjusted maxWidth */}
          {posts.map((post) => (
            <Link href={`/prispevok/${post.id}`} key={post.id} passHref>
              <Card
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: 5,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)', // Hover effect
                  },
                  backgroundColor: 'white', // Ensure the cards are white
                }}
              >
                <CardMedia
                  component="img"
                  height="250"  // Adjusted image height
                  image={post.imageUrl}
                  alt={post.caption || "Default alt text"}  // Fallback for alt text
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {post.user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {post.caption}
                  </Typography>
                </CardContent>
                <Divider />
              </Card>
            </Link>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No posts available.</Typography>
      )}
    </Box>
  );
}
