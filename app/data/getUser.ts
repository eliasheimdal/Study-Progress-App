// app/data/getUser.ts
import "server-only";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  if (!email) {
    return null;
  }
  const user = await db.user.findUnique({
    where: { email },
  });
  return user;
};

export const getUserById = async (id: string): Promise<User | null> => {
  if (!id) {
    return null;
  }
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
}
