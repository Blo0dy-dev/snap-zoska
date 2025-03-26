"use server";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export const fetchPosts = async () => {
  try {
    return await prisma.post.findMany({
      include: {
        user: true,
        images: true,
        likes: true,
        comments: { include: { user: true } },
        bookmarks: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
};

export const likePost = async (postId: string, userId: string) => {
  try {
    const existingLike = await prisma.like.findFirst({
      where: { postId, userId },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return { action: 'unlike' };
    } else {
      await prisma.like.create({ data: { postId, userId } });
      return { action: 'like' };
    }
  } catch (error) {
    console.error("Error updating like:", error);
    throw new Error("Could not update like");
  }
};

export const addComment = async (postId: string, userId: string, content: string) => {
  try {
    return await prisma.comment.create({
      data: { postId, userId, content },
      include: { user: true },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Could not add comment");
  }
};

export const toggleBookmark = async (postId: string, userId: string) => {
  try {
    const existingBookmark = await prisma.bookmark.findFirst({
      where: { postId, userId },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({ where: { id: existingBookmark.id } });
      return { action: 'remove' };
    } else {
      await prisma.bookmark.create({ data: { postId, userId } });
      return { action: 'add' };
    }
  } catch (error) {
    console.error("Error updating bookmark:", error);
    throw new Error("Could not update bookmark");
  }
};