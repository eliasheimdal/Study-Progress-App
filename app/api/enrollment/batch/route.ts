import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, enroll, remove } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    console.log("Batch API received:", { userId, enroll, remove });

    // Batch insert enrollments
    if (enroll && enroll.length > 0) {
      await db.enrollment.createMany({
        data: enroll.map((courseId: number) => ({
          userId,
          courseId,
        })),
        skipDuplicates: true, // Avoid inserting duplicates
      });
    }

    // Batch delete enrollments
    if (remove && remove.length > 0) {
      await db.enrollment.deleteMany({
        where: {
          userId,
          courseId: { in: remove },
        },
      });
    }

    return NextResponse.json({ message: "Enrollments updated" }, { status: 200 });
  } catch (error) {
    console.error("Batch enrollment error:", error);
    return NextResponse.json({ error: "Failed to update enrollments" }, { status: 500 });
  }
}