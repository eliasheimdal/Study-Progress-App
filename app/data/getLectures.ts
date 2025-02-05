import "server-only";
import { Lecture } from "@prisma/client";
import { db } from "@/lib/db";


export const getLectures = async (): Promise<Lecture[]> => {
    const lectures = await db.lecture.findMany({
        include: {
        course: true,
        },
    });
    return lectures;
    };

