import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, CardMedia, Divider, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const prisma = new PrismaClient();

export const metadata = { title: 'Zoznam príspevkov | Zoska' };

async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        user: true,
        images: true,
        likes: true,    // Include likes
        comments: true, // Include comments
        bookmarks: true // Include bookmarks
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ padding: 2, backgroundColor: 'transparent' }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        Zoznam príspevkov
      </Typography>
      {posts.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={3} width="100%" maxWidth={800}>
          {posts.map((post) => (
            <Link href={`/prispevok/${post.id}`} key={post.id} passHref>
              <Card
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: 5,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                  backgroundColor: 'background.paper',
                }}
              >
                {post.images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={post.images[0].imageUrl}
                    alt={post.caption || "Obrázok príspevku"}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                    }}
                  />
                )}

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
                
                {/* Interaction Metrics */}
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FavoriteIcon color="error" fontSize="small" />
                      <Typography variant="body2">
                        {post.likes.length}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CommentIcon color="primary" fontSize="small" />
                      <Typography variant="body2">
                        {post.comments.length}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <BookmarkIcon color="secondary" fontSize="small" />
                      <Typography variant="body2">
                        {post.bookmarks.length}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
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