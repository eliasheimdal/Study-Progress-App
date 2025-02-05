import "server-only";

import { Course } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { minutesToSeconds } from "date-fns";

export const getCourses = (
    async (): Promise<Course[]> => {
        const courses = await db.course.findMany({
            include: {
                exercises: true,
            },
        });
        return courses;
    }
);
