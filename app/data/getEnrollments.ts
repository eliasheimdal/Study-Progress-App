import "server-only";
import { Enrollment } from "@prisma/client";
import { db } from "@/lib/db";

export const getEnrollments = async (userId: string): Promise<Enrollment[]> => {
  if (!userId) {
    throw new Error("User ID is undefined. Please pass a valid ID.");
  }
  const enrollments = await db.enrollment.findMany({
    where: { userId },
  });
  return enrollments;
}