// app/data/getUser.ts
import "server-only";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export const getUser = async (email: string): Promise<User | null> => {
  if (!email) {
    throw new Error("User email is undefined. Please pass a valid email.");
  }
  const user = await db.user.findUnique({
    where: { email },
  });
  return user;
};
