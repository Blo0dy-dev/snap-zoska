"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { likePost, toggleBookmark, addComment, deleteComment } from "@/app/actions/posts";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Collapse,
  Zoom,
  Slide,
  Fade,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

interface CommentUser {
  id: string;
  name: string | null;
  image?: string | null;
}

interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  user?: CommentUser;
}

interface InteractivePostProps {
  post: {
    id: string;
    likes: { userId: string }[];
    bookmarks: { userId: string }[];
    comments: CommentType[];
  };
  currentUserId: string;
}

const AnimatedIconButton = styled(IconButton)({
  transition: 'transform 0.3s ease, color 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)'
  }
});

const LikeButton = styled(AnimatedIconButton)({
  '&.liked': {
    animation: '$pulse 0.5s ease'
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.3)' },
    '100%': { transform: 'scale(1)' }
  }
});

export default function InteractivePost({ post, currentUserId }: InteractivePostProps) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [likedState, setLikedState] = useState(false);
  const [bookmarkedState, setBookmarkedState] = useState(false);

  const liked = post.likes.some((like) => like.userId === currentUserId);
  const bookmarked = post.bookmarks.some((bm) => bm.userId === currentUserId);

  const handleLike = async () => {
    setLikedState(true);
    await likePost(post.id, currentUserId);
    router.refresh();
    setTimeout(() => setLikedState(false), 500);
  };

  const handleBookmark = async () => {
    setBookmarkedState(true);
    await toggleBookmark(post.id, currentUserId);
    router.refresh();
    setTimeout(() => setBookmarkedState(false), 300);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      await addComment(post.id, currentUserId, comment);
      setComment("");
      setExpanded(true);
      router.refresh();
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId, currentUserId);
    router.refresh();
  };

  const toggleComments = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Interactive Actions */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Tooltip title={liked ? "Unlike" : "Like"} placement="top">
          <LikeButton 
            onClick={handleLike} 
            className={likedState ? 'liked' : ''}
            size="small"
          >
            <FavoriteIcon
              color={liked ? "error" : "action"}
              sx={{
                transition: 'color 0.3s ease',
                fontSize: '1.5rem'
              }}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {post.likes.length}
            </Typography>
          </LikeButton>
        </Tooltip>

        <Tooltip title="Comments" placement="top">
          <AnimatedIconButton onClick={toggleComments} size="small">
            <CommentIcon color="primary" sx={{ fontSize: '1.5rem' }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {post.comments.length}
            </Typography>
          </AnimatedIconButton>
        </Tooltip>

        <Tooltip title={bookmarked ? "Remove bookmark" : "Bookmark"} placement="top">
          <AnimatedIconButton onClick={handleBookmark} size="small">
            <BookmarkIcon
              color={bookmarked ? "secondary" : "action"}
              sx={{
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: bookmarkedState ? 'scale(1.2)' : 'scale(1)',
                fontSize: '1.5rem'
              }}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {post.bookmarks.length}
            </Typography>
          </AnimatedIconButton>
        </Tooltip>
      </Stack>

      {/* Comment Form */}
      {currentUserId && (
        <Fade in={true} timeout={500}>
          <Box sx={{ mt: 1, mb: 2 }}>
            <form onSubmit={handleCommentSubmit}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      backgroundColor: 'background.paper'
                    }
                  }}
                />
                <Zoom in={comment.trim().length > 0}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    endIcon={<SendIcon />}
                    sx={{ 
                      borderRadius: '20px',
                      px: 2,
                      minWidth: 'unset'
                    }}
                  >
                    Post
                  </Button>
                </Zoom>
              </Stack>
            </form>
          </Box>
        </Fade>
      )}

      {/* Comments Section */}
      {post.comments && post.comments.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              Comments ({post.comments.length})
            </Typography>
            <Stack spacing={1.5}>
              {post.comments.map((comm, index) => (
                <Slide 
                  key={comm.id} 
                  direction="up" 
                  in={true} 
                  timeout={(index + 1) * 100}
                  mountOnEnter
                  unmountOnExit
                >
                  <Box
                    sx={{
                      p: 1.5,
                      backgroundColor: 'action.hover',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      position: 'relative'
                    }}
                  >
                    <Avatar 
                      src={comm.user?.image || undefined} 
                      sx={{ width: 32, height: 32 }}
                    >
                      {comm.user?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
  <Stack direction="row" alignItems="center" spacing={1}>
    <Typography variant="subtitle2" fontWeight="medium">
      {comm.user?.name || "Unknown"}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {new Date(comm.createdAt).toLocaleString()}
    </Typography>
  </Stack>
  <Typography 
    variant="body2" 
    sx={{ 
      mt: 0.5,
      textAlign: 'left',
      whiteSpace: 'pre-line'
    }}
  >
    {comm.content}
  </Typography>
</Box>
                    {comm.user?.id === currentUserId && (
                      <Tooltip title="Delete comment" placement="top">
                        <IconButton
                          onClick={() => handleDeleteComment(comm.id)}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            color: 'text.secondary'
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Slide>
              ))}
            </Stack>
          </Collapse>
          
          {!expanded && (
            <Button 
              onClick={toggleComments}
              size="small"
              endIcon={<ExpandMoreIcon />}
              sx={{ 
                mt: 1,
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}
            >
              Show comments
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}