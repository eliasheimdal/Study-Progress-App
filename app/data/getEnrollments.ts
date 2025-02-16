import "server-only";
import { Enrollment } from "@prisma/client";
import { db } from "@/lib/db";

export const getEnrollments = async (userId: string): Promise<Enrollment[]> => {
  if (!userId) {
    return [];
  }
  const enrollments = await db.enrollment.findMany({
    where: { userId },
  });
  return enrollments;
}