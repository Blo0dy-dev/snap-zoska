"use server";

// Import Prisma client rovnako ako v `posts.ts`
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Vyhľadanie používateľov alebo načítanie všetkých
export const searchUsers = async (query: string = "") => {
  try {
    return await prisma.user.findMany({
      where: query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } }
            ]
          }
        : undefined, // Ak nie je query, vráti všetkých používateľov
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      }
    });
  } catch (error) {
    console.error("Chyba pri načítavaní používateľov:", error);
    throw new Error("Nepodarilo sa načítať používateľov");
  }
};
