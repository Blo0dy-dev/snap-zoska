import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { PrismaClient } from "@prisma/client";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, CardMedia, Divider } from "@mui/material";
import InteractivePost from "./InteractivePost";

const prisma = new PrismaClient();

export const metadata = { title: "Zoznam príspevkov | Zoska" };

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        images: true,
        likes: true,
        comments: { 
          include: { 
            user: true 
          },
          orderBy: {
            createdAt: 'asc'
          }
        },
        bookmarks: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      comments: post.comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        user: comment.user ? {
          ...comment.user,
          createdAt: comment.user.createdAt.toISOString(),
          updatedAt: comment.user.updatedAt.toISOString(),
          emailVerified: comment.user.emailVerified?.toISOString() || null
        } : undefined
      }))
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function PostList() {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id || "";
  const posts = await getPosts();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ padding: 2, backgroundColor: "transparent" }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4 }}
      >
        Zoznam príspevkov
      </Typography>

      {posts.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={3} width="100%" maxWidth={800}>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: 5,
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-10px)" },
                backgroundColor: "background.paper",
              }}
            >
              <Link href={`/prispevok/${post.id}`} passHref>
                {post.images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={post.images[0].imageUrl}
                    alt={post.caption || "Obrázok príspevku"}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                )}
              </Link>

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

              <InteractivePost 
                post={{
                  id: post.id,
                  likes: post.likes,
                  bookmarks: post.bookmarks,
                  comments: post.comments
                }} 
                currentUserId={currentUserId} 
              />
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">
          Žiadne príspevky nie sú dostupné.
        </Typography>
      )}
    </Box>
  );
}